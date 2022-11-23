const mongoose = require('mongoose');

const { Media, Administrator } = require('../../../models');
const { countPerPage, fuzzySearch } = require('../../../helpers');
const s3Service = require('../../../services/s3');

const { ObjectId } = mongoose.Types;

const perPage = 20;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const {
        q,
        minetype,
        page,
      } = req.query;

      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = {};

      const administrator = await Administrator
        .findById(req.session.admin.id)
        .populate('role', 'permissions isRoot')
        .select('role')
        .lean();

      const hasGetAllImage = administrator.role.isRoot
        || administrator.role.permissions.includes('GET_LIST_MEDIA_ALL');

      if (!hasGetAllImage) {
        conditionFind.uploadBy = req.session.admin.id;
      }

      if (q) {
        conditionFind.name = fuzzySearch(q);
      }

      if (minetype) {
        conditionFind.minetype = minetype;
      }

      const getMedia = Media
        .find(conditionFind)
        .sort({ createdAt: -1 })
        .limit(perPage)
        .skip(perPage * (currentPage - 1))
        .lean()
        .select('-keyName');

      const getTotalMedias = Media.countDocuments(conditionFind);

      const [media, totalMedias] = await Promise.all([getMedia, getTotalMedias]);

      res.render('admin/body/media/index', {
        media,
        query: req.query,
        currentPage,
        totalMedias,
        totalPage: Math.ceil(totalMedias / perPage),
        countPerPage,
      });
    } catch (error) {
      next(error);
    }
  },
  uploadFile: (req, res) => {
    s3Service.upload.single('file')(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Upload file failed',
          payload: err.toString(),
        });
      }

      try {
        const {
          originalname, mimetype, transforms,
        } = req.file;
        let file;
        if (transforms && transforms[0]) {
          file = await Media
            .create({
              name: originalname,
              keyName: transforms[0].key,
              mimeType: mimetype,
              size: transforms[0].size,
              location: transforms[0].location,
              uploadBy: req.session.admin.id,
            });
        } else {
          const {
            key, size, location,
          } = req.file;
          file = await Media
            .create({
              name: originalname,
              keyName: key,
              mimeType: mimetype,
              size,
              location,
              uploadBy: req.session.admin.id,
            });
        }


        res.json({
          message: 'Upload file successfully',
          payload: file,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Upload file failed',
          payload: error.toString(),
        });
      }
    });
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const media = await Media
        .findById(id)
        .lean();

      if (!media) {
        return next();
      }

      res.render('admin/body/media/edit', { media });
    } catch (error) {
      next(error);
    }
  },
  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();

      await Media.findByIdAndUpdate(id, req.body);

      req.flash('success', 'Edit successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
  onDelete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const media = await Media
        .findById(id)
        .lean()
        .select('keyName');

      const deleteMedia = Media.findByIdAndDelete(id);

      const deleteObject = s3Service.s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: media.keyName,
      }).promise();

      await Promise.all([deleteMedia, deleteObject]);

      res.json({
        message: 'Delete successfully',
        payload: media,
      });
    } catch (error) {
      next(error);
    }
  },

  ckeImagePage: async (req, res) => {
    res.render('admin/body/media/browserImageCKE');
  },
  fetchBrowserImages: async (req, res) => {
    try {
      const { q, page } = req.query;
      let { offset } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = {};

      conditionFind.$or = [
        { mimeType: 'image/png' },
        { mimeType: 'image/jpeg' },
      ];

      const administrator = await Administrator
        .findById(req.session.admin.id)
        .populate('role', 'permissions isRoot')
        .select('role')
        .lean();

      const hasGetAllImage = administrator.role.isRoot
        || administrator.role.permissions.includes('GET_LIST_MEDIA_BROWSER_ALL');

      if (!hasGetAllImage) {
        conditionFind.uploadBy = req.session.admin.id;
      }

      if (q) {
        conditionFind.name = fuzzySearch(q);
      }

      offset = +offset || 20;

      const getMedia = Media
        .find(conditionFind)
        .sort({ createdAt: -1 })
        .limit(offset)
        .skip(offset * (currentPage - 1))
        .lean()
        .select('_id location name');

      const getTotalItems = Media.countDocuments(conditionFind);

      const [media, totalItems] = await Promise.all([getMedia, getTotalItems]);

      res.json({
        data: media,
        pagination: {
          totalItems,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Fetch image failed',
        payload: error.toString(),
      });
    }
  },
};
