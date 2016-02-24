var express = require('express');
var router = express.Router();
var admin = require('./route'); 
var auth = require('../../auth/service');

// router.post('/', auth.hasRole('admin'), admin.create);
router.get('/sitemap', admin.generateSitemap);
router.get('/cache/rebuild', admin.rebuildCache);
router.get('/cache/update', admin.updateCache);
// router.get('/me', auth.isAuthenticated(), admin.me);
// router.get('/setup', admin.setup);
// auth.hasRole('admin'),

module.exports = router;
