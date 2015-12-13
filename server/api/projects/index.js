var express = require('express');
var router = express.Router();
var projects = require('./route');
var auth = require('../../auth/service');

router.get('/sync', auth.hasRole('admin'), projects.sync);
router.post('/', auth.hasRole('admin'), projects.add);
router.get('/', auth.hasRoleNotStrict('admin'), projects.getAll);
router.put('/:id', auth.hasRole('admin'), projects.update);
router.get('/:id', auth.hasRoleNotStrict('admin'), projects.getOne);
// router.delete('/:id', auth.hasRole('admin'), projects.delete);

module.exports = router;
