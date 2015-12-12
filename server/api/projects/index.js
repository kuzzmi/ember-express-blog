var githubAPI = require('node-github');
var express = require('express');
var router = express.Router();
var projects = require('./route');
var auth = require('../../auth/service');

router.get('/sync', auth.hasRole('admin'), function(req, res) {
    var github = new githubAPI({
        version: '3.0.0'
    });

    github.repos.getFromUser({ 
        user: 'kuzzmi'
    }, function(err, data) {
        res.json(data);
    });
});

router.post('/', auth.hasRole('admin'), projects.add);
router.get('/', projects.getAll);
router.put('/:id', auth.hasRole('admin'), projects.update);
router.get('/:id', projects.getOne);
// router.delete('/:id', auth.hasRole('admin'), projects.delete);

module.exports = router;
