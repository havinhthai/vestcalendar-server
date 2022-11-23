const express = require('express');

const router = express.Router();

const authRoutes = require('./auth/routes');
const projectRoutes = require('./project/routes');
const userRoutes = require('./user/routes');
const profileRoutes = require('./profile/routes');

const middleware = require('./middleware');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

router.use(middleware.checkAuth);

router.use('/users', userRoutes);
router.use('/me', profileRoutes);

module.exports = router;
