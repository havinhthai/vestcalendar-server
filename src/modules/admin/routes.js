const express = require('express');

const router = express.Router();

const middleware = require('./middleware');

const authRoutes = require('./auth/routes');
const administratorRoutes = require('./administrator/routes');
const userRoutes = require('./user/routes');
const roleRoutes = require('./role/routes');
const mediaRoutes = require('./media/routes');
const profileRoutes = require('./profile/routes');
const infoRoutes = require('./info/routes');
const dashboardRoutes = require('./dashboard/routes');
const categoryRoutes = require('./category/routes');
const projectRoutes = require('./project/routes');
const telegramRoutes = require('./telegram/routes');

router.use('/auth', authRoutes);

router.use(middleware.redirectNonLogin);
router.use(middleware.checkPermission);

router.use('/administrators', administratorRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/media', mediaRoutes);
router.use('/info', infoRoutes);
router.use('/profile', profileRoutes);
router.use('/categories', categoryRoutes);
router.use('/projects', projectRoutes);
router.use('/telegram', telegramRoutes);

router.use('/', dashboardRoutes);

router.use(middleware.catch404Admin);
router.use(middleware.catch500Admin);

module.exports = router;
