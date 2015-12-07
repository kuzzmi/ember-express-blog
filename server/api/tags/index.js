var express = require('express');
var router = express.Router();
var auth = require('../../auth/service');
var tags = require('./route');

router.post('/', auth.hasRole('admin'), tags.add);
router.get('/', tags.getAll);
router.put('/:id', auth.hasRole('admin'), tags.update);
router.get('/:id', tags.getOne);
router.delete('/:id', auth.hasRole('admin'), tags.delete);

module.exports = router;
