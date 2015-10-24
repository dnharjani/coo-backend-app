var http = require('http');
var express = require('express');
var path = require('path');
var application = express();
var bodyParser = require('body-parser');
var routeConfig = require('./routeconfig');
var settingsConfig = require('./settings/settingsconfig');

function configureWorker(application) {
    configureApplication(application);
    configureRoutes(application);

    startServer(application);
}

function configureApplication(application) {
    application.use(bodyParser.json({limit: '50mb'}));
    application.use(bodyParser.urlencoded({extended: true,limit: '50mb',parameterLimit: 10000}));

    application.use(function (req, res, next) {
        res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
        res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        next();
    });

    application.use(express.static(path.join(__dirname, '../public')));
    application.engine('html', require('ejs').renderFile);
    application.get('/', function(req, res){
       res.render('../app/views/index.html');
    });
}


function configureRoutes(application) {
    routeConfig.registerRoutes(application);
}

function startServer(application) {
    var server = http.createServer(application);

    server.listen(settingsConfig.settings.workerPort, settingsConfig.settings.hostName, settingsConfig.settings.queueLength, function () {
        console.log('listening at http://%s:%s', settingsConfig.settings.hostName, settingsConfig.settings.workerPort);
    });
}

configureWorker(application);
module.exports = application;