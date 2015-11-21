function generatePost(id) {
    return {
        id: id,
        title: 'Post ' + id,
        body: '<b>Post ' + id + ' Body</b>',
        description: 'This post #' + id + ' is about testing',
        dateCreated: new Date()
    };
}

var data = {
    'posts': [
        generatePost(1),
        generatePost(2),
        generatePost(3),
        generatePost(4),
        {
            id: 5,
            title: 'Super test',
            description: 'Testing old post',
            dateCreated: new Date('2014/07/21'),
            body: '\
            <pre><code>\
console.log("hehehe");\
            </code></pre>'
        }
    ]
};

/*jshint node:true*/
module.exports = function(app) {
    var express = require('express');
    var postsRouter = express.Router();

    postsRouter.get('/', function(req, res) {
        res.send(data);
    });

    postsRouter.post('/', function(req, res) {
        var post = req.body.post;
        post.id = data.posts.length + 1;
        res.status(201).json({
            'posts': post
        });
    });

    postsRouter.get('/:id', function(req, res) {
        var postData = data.posts.filter(function(post) {
            return post.id === req.params.id;
        })[0]
        res.send({
            'posts': postData
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
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false  }));
    app.use(bodyParser.json());
    app.use('/api/posts', postsRouter);
};
