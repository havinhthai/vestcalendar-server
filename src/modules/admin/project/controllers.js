/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const { Project, Category } = require('../../../models');

const {
  countPerPage, fuzzySearch, parseQueryStatus, convertDateTime,
} = require('../../../helpers');


const perPage = 25;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const {
        sort, q, page, category,
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

      if (category) {
        conditionFind.categories = category;
      }

      const getProjects = Project
        .find(conditionFind)
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort(conditionSort)
        .populate('categories', 'name')
        .populate('createdBy', 'firstName lastName')
        .lean();

      const getTotalProjects = Project.countDocuments(conditionFind);

      const [projects, totalProjects] = await Promise.all([
        getProjects, getTotalProjects]);

      res.render('admin/body/project/index', {
        projects,
        query: req.query,
        currentPage,
        totalProjects,
        totalPage: Math.ceil(totalProjects / perPage),
        countPerPage,
        currentAdmin: req.session.admin.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addPage: async (req, res, next) => {
    try {
      const categories = await Category
        .find({ isPublished: true, deletedAt: { $exists: false } })
        .sort({ createdAt: -1 })
        .select('name')
        .lean();

      res.render('admin/body/project/add', { categories });
    } catch (error) {
      next(error);
    }
  },

  onAdd: async (req, res, next) => {
    try {
      const {
        name,
        slug,
        ticker,
        totalSupply,
        circulatingSupply,
        // privateTimeline,
        logo,
        description,
        categories,
        distributionTimeline,
        links,
        allocations,
        tgeSummary,
        vestingSchedule,
        monthCountingStart,
        vestingMonth,
        vestingYear,
        vestingRoiMaxPrice,
        isPublished,
        coingeckoId,
      } = req.body;

      let vestingMonthStart;
      if (monthCountingStart) {
        vestingMonthStart = `${vestingMonth}-${vestingYear}`;
      }

      if (distributionTimeline && distributionTimeline.length) {
        distributionTimeline.forEach((item) => {
          item.isDisplayDate = !!item.isDisplayDate;
          item.isDisplayTime = !!item.isDisplayTime;
          item.time = convertDateTime(item.time);
        });
      }

      const projectContent = {
        name,
        slug,
        totalSupply,
        circulatingSupply,
        // privateTimeline,
        ticker,
        coingeckoId,
        logo,
        description,
        categories: categories || [],
        distributionTimeline: distributionTimeline || [],
        links: links || [],
        allocations: allocations || [],
        tgeSummary: tgeSummary || [],
        vestingMonthStart,
        vestingSchedule: vestingSchedule || [],
        vestingRoiMaxPrice,
        isPublished: !!isPublished,
        createdBy: req.session.admin.id,
      };

      const project = new Project(projectContent);

      await project.save();

      req.flash('success', 'Successfully add project!');
      res.redirect('/admin/projects');
    } catch (error) {
      next(error);
    }
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const project = await Project
        .findById(id)
        .lean();

      if (!project) return next();

      const categories = await Category
        .find({ isPublished: true, deletedAt: { $exists: false } })
        .sort({ createdAt: -1 })
        .select('name')
        .lean();

      if (project.vestingMonthStart) {
        const arr = project.vestingMonthStart.split('-');
        project.vestingMonth = arr[0];
        project.vestingYear = arr[1];
        project.monthCountingStart = true;
      }

      res.render('admin/body/project/edit', { project, categories });
    } catch (error) {
      next(error);
    }
  },

  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        slug,
        ticker,
        coingeckoId,
        totalSupply,
        circulatingSupply,
        // privateTimeline,
        logo,
        description,
        categories,
        distributionTimeline,
        links,
        allocations,
        tgeSummary,
        vestingSchedule,
        monthCountingStart,
        vestingMonth,
        vestingYear,
        vestingRoiMaxPrice,
        isPublished,
      } = req.body;


      const project = await Project.findById(id);

      if (!project) return next();

      let vestingMonthStart;
      if (monthCountingStart) {
        vestingMonthStart = `${vestingMonth}-${vestingYear}`;
      }

      if (distributionTimeline && distributionTimeline.length) {
        distributionTimeline.forEach((item) => {
          item.isDisplayDate = !!item.isDisplayDate;
          item.isDisplayTime = !!item.isDisplayTime;
          item.time = convertDateTime(item.time);
        });
      }

      const projectContent = {
        name,
        slug,
        ticker,
        coingeckoId,
        totalSupply,
        circulatingSupply,
        // privateTimeline,
        logo,
        description,
        categories: categories || [],
        distributionTimeline: distributionTimeline || [],
        links: links || [],
        allocations: allocations || [],
        tgeSummary: tgeSummary || [],
        vestingMonthStart,
        vestingSchedule: vestingSchedule || [],
        vestingRoiMaxPrice,
        isPublished: !!isPublished,
      };

      await Project.findByIdAndUpdate(id, projectContent);

      req.flash('success', 'Successfully edit project!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  onDelete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const project = await Project.findById(id);
      if (!project) return next();

      await project.remove();

      res.json({ message: 'Successfully delete project' });
    } catch (error) {
      next(error);
    }
  },
};
