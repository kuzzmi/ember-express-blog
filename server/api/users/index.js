var express = require('express');
var router = express.Router();
var users = require('./route'); 
var auth = require('../../auth/service');

router.post('/', users.create);
router.get('/', auth.hasRole('admin'), users.index);
router.get('/me', auth.isAuthenticated(), users.me);

module.exports = router;
