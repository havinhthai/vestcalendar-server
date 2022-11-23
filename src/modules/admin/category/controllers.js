const { Category } = require('../../../models');
const { countPerPage, fuzzySearch, parseQueryStatus } = require('../../../helpers');

// const { ObjectId } = mongoose.Types;

const perPage = 25;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const {
        sort, q, page,
      } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = {};
      const conditionSort = {};

      switch (+sort) {
        case 2:
          conditionSort.createdAt = 1;
          break;
        default:
          conditionSort.createdAt = 1;
      }

      if (q) {
        const search = fuzzySearch(q);

        conditionFind.$or = [
          { name: search },
        ];
      }

      req.query.isPublished = req.query.isPublished || '1';
      conditionFind.isPublished = parseQueryStatus(req.query.isPublished);

      if (req.query.type && req.query.type !== '0') {
        conditionFind.type = req.query.type;
      }

      const getCategories = Category
        .find(conditionFind)
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort(conditionSort)
        .lean();


      const getTotalCategories = Category.countDocuments(conditionFind);

      const [categories, totalCategories] = await Promise.all([
        getCategories, getTotalCategories]);

      res.render('admin/body/category/index', {
        categories,
        query: req.query,
        currentPage,
        totalCategories,
        totalPage: Math.ceil(totalCategories / perPage),
        countPerPage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addPage: async (req, res, next) => {
    try {
      res.render('admin/body/category/add');
    } catch (error) {
      next(error);
    }
  },

  onAdd: async (req, res, next) => {
    try {
      const {
        name,
        slug,
        description,
        isPublished,
      } = req.body;

      const categoryContent = {
        name,
        description,
        isPublished: !!isPublished,
        slug,
      };

      const category = new Category(categoryContent);

      await category.save();

      req.flash('success', 'Add category successfully!');
      res.redirect('/admin/categories');
    } catch (error) {
      next(error);
    }
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category
        .findById(id)
        .lean();

      if (!category) return next();

      res.render('admin/body/category/edit', { category });
    } catch (error) {
      next(error);
    }
  },

  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name, description, isPublished,
      } = req.body;

      const category = await Category.findById(id);

      if (!category) return next();

      const categoryContent = {
        name,
        description,
        isPublished: !!isPublished,
      };

      await Category.findByIdAndUpdate(id, categoryContent);

      req.flash('success', 'Edit category successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  onDelete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);
      if (!category) return next();

      await category.remove();

      res.json({ message: 'Successfully delete category' });
    } catch (error) {
      next(error);
    }
  },
};
