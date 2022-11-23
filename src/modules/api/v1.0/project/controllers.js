const {
  apiResponse, apiErrors, getPageSize, fuzzySearch,
} = require('../../../../helpers');
const { Project, WatchProject } = require('../../../../models');
const Jwt = require('../../../../services/jwt');

const LIMIT_PAGE = 50;

module.exports = {
  getProjects: async (req, res, next) => {
    try {
      const { page, limit, q } = req.query;
      const conditionFind = { isPublished: true };
      const conditionSort = { updatedAt: -1 };

      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const limitPage = getPageSize(limit ? +limit : LIMIT_PAGE);

      if (q) {
        conditionFind.$or = [
          { name: fuzzySearch(q) },
          { ticker: fuzzySearch(q) },
        ];
      }

      const findProjects = Project.find(conditionFind)
        .select('name ticker coingeckoId slug logo distributionTimeline totalSupply vestingSchedule vestingMonthStart vestingRoiMaxPrice circulatingSupply allocations')
        .sort(conditionSort)
        .skip(limitPage * (currentPage - 1))
        .limit(limitPage)
        .lean();

      const totalProjects = Project.countDocuments(conditionFind);

      const [projects, total] = await Promise.all([findProjects, totalProjects]);

      res.json(apiResponse({ payload: { data: projects, total } }));
    } catch (error) {
      next(error);
    }
  },

  getProjectDetails: async (req, res, next) => {
    try {
      const { id } = req.params;

      const project = await Project.findOne({ _id: id, isPublished: true })
        .lean();

      if (!project) {
        return res.status(apiErrors.projectNotFound.status)
          .json(apiErrors.projectNotFound);
      }

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        const { _id: user } = await Jwt.verifyToken(token);

        const existInWatchList = await WatchProject.exists({
          user,
          project: project._id,
        });

        project.watchProject = existInWatchList;
      }


      res.json(apiResponse({ payload: project }));
    } catch (error) {
      next(error);
    }
  },

  getWatchList: async (req, res, next) => {
    try {
      const { page, limit, q } = req.query;
      const conditionFind = { user: req.user.id };
      const conditionSort = { updatedAt: -1 };

      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const limitPage = getPageSize(limit ? +limit : LIMIT_PAGE);

      if (q) {
        conditionFind.$or = [
          { name: fuzzySearch(q) },
          { ticker: fuzzySearch(q) },
        ];
      }

      const findProjects = WatchProject.find(conditionFind)
        .populate('project')
        .select('-_id -user')
        .sort(conditionSort)
        .skip(limitPage * (currentPage - 1))
        .limit(limitPage)
        .lean();

      const totalProjects = WatchProject.countDocuments(conditionFind);

      const [projects, total] = await Promise.all([findProjects, totalProjects]);

      projects.forEach((item, index) => {
        projects[index] = item.project;

        projects.watchProject = true;
      });

      res.json(apiResponse({ payload: { data: projects, total } }));
    } catch (error) {
      next(error);
    }
  },

  addProjectToWatchList: async (req, res, next) => {
    try {
      const { id: userId } = req.user;

      const { id: projectId } = req.params;

      const project = await Project.findById(projectId).lean();

      if (!project) {
        return res.status(apiErrors.projectNotFound.status)
          .json(apiErrors.projectNotFound);
      }

      const watchProject = await WatchProject.findOne({ project: projectId, user: userId });

      if (watchProject) {
        return res.status(apiErrors.watchProjectExists.status)
          .json(apiErrors.watchProjectExists);
      }

      await WatchProject.create({
        project: projectId,
        user: userId,
      });

      project.watchProject = true;

      res.json(apiResponse({ payload: project }));
    } catch (error) {
      next(error);
    }
  },

  removeProjectFromWatchList: async (req, res, next) => {
    try {
      const { id: userId } = req.user;

      const { id: projectId } = req.params;

      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(apiErrors.projectNotFound.status)
          .json(apiErrors.projectNotFound);
      }

      const watchProject = await WatchProject.findOne({ project: projectId, user: userId });

      if (!watchProject) {
        return res.status(apiErrors.watchProjectNotFound.status)
          .json(apiErrors.watchProjectNotFound);
      }

      await watchProject.remove();

      res.json(apiResponse());
    } catch (error) {
      next(error);
    }
  },
};
