var express = require('express');
var redis = require('redis'),
    client = redis.createClient();

var app = express();

var getContent = function(url, callback) {
    var content = '';

    var phantom = require('child_process').spawn('phantomjs', ['/root/ember-express-blog/cache/phantom.js', url]);
    phantom.stdout.setEncoding('utf8');
    phantom.stdout.on('data', function(data) {
        content += data.toString();
    });
    phantom.stderr.on('data', function(data) {
        console.log(data.toString());
    });
    phantom.on('exit', function(code) {
        if (code !== 0) {
            console.log('We have an error: ' + code);
        } else {
            callback(content);
        }
    });
};

var respond = function (req, res) {
    client.get(req.params[0], function(err, data) {
        if (!data || req.params[0] === '/') {
            url = 'https://kuzzmi.com' + req.params[0];
            getContent(url, function (content) {
                client.set(req.params[0], content);
                res.send(content);
            });
        } else {
            res.send(data);
        }
    });
};

app.get(/(.*)/, respond);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            'error': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'error': {
            message: err.message,
            error: {}
        }
    });
});


module.exports = app;
