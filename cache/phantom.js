var page = require('webpage').create();
var system = require('system');

var lastReceived = new Date().getTime();
var requestCount = 0;
var responseCount = 0;
var requestIds = [];
var startTime = new Date().getTime();

page.onResourceReceived = function (response) {
    if(requestIds.indexOf(response.id) !== -1) {
        lastReceived = new Date().getTime();
        responseCount++;
        requestIds[requestIds.indexOf(response.id)] = null;
    }
};

page.onResourceRequested = function (request) {
    if(requestIds.indexOf(request.id) === -1) {
        requestIds.push(request.id);
        requestCount++;
    }
};

page.open(system.args[1], function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
	phantom.exit();
    } else {
        setTimeout(function() {
            var p = page.content;
            console.log(p);
            phantom.exit();
	}, 1500);
    }
});
