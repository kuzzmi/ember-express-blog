var marked = require('marked');
var express = require('express');
var router = express.Router();
var posts = require('./route');
var auth = require('../../auth/service');

router.post('/', auth.hasRole('admin'), posts.add);
router.get('/', posts.getAll);
router.put('/:id', auth.hasRole('admin'), posts.update);
router.get('/:id', posts.getOne)
router.delete('/:id', posts.delete);

/*
 *  MARKDOWN PREVIEW
 */ 
router.route('/preview')
    .post(function(req, res) {
        var body = req.body.body;
        if (body) {
            body = marked(body);
            res.json({
                'html': body
            });
        } else {
            throw 'No body specified';
        }
    });

module.exports = router;
