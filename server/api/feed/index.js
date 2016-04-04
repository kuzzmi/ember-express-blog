var express = require('express');
var router = express.Router();
var feed = require('./route');

router.get('/rss', feed.rss);

module.exports = router;
