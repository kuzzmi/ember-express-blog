function generatePost(id) {
    return {
        id: id,
        title: 'Post ' + id,
        body: '<b>Post ' + id + ' Body</b>',
        dateCreated: new Date()
    }
}

var posts = {
    'posts': [
        generatePost(1),
        generatePost(2),
        generatePost(3),
        generatePost(4),
    ]
};

/*jshint node:true*/
module.exports = function(app) {
    var express = require('express');
    var postsRouter = express.Router();

    postsRouter.get('/', function(req, res) {
        res.send(posts);
    });

    postsRouter.post('/', function(req, res) {
        res.status(201).end();
    });

    postsRouter.get('/:id', function(req, res) {
        res.send({
            'posts': generatePost(req.params.id)
        });
    });

    postsRouter.put('/:id', function(req, res) {
        res.send({
            'posts': {
                id: req.params.id
            }
        });
    });

    postsRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/posts', require('body-parser'));
    app.use('/api/posts', postsRouter);
};
