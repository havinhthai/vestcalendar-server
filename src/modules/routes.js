const express = require('express');

const router = express.Router();

const apiRoutes = require('./api/routes');

const adminRoutes = require('./admin/routes');
const adminApiRoutes = require('./admin/routes.api');

router.use('/api', apiRoutes);

router.use('/admin/api', adminApiRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
