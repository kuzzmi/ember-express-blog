var marked = require('marked');
var express = require('express');
var router = express.Router();
var posts = require('./route');
var auth = require('../../auth/service');
var config = require('../../config/config');
var multer = require('multer');
var upload = multer({ dest: config.uploadPath });

router.post('/', auth.hasRole('admin'), posts.add);
router.post('/upload', upload.single('file'), posts.upload);
router.get('/', auth.hasRoleNotStrict('admin'), posts.getAll);
router.put('/:id', auth.hasRole('admin'), posts.update);
router.get('/:slug', auth.hasRoleNotStrict('admin'), posts.getOne);
router.delete('/:id', auth.hasRole('admin'), posts.delete);

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
