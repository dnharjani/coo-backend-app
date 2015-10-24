var settingsConfig = require('./settings/settingsconfig'),
    Promise = require('promise');

function RouteConfig() {
}

/**
 * @apiDefine read Read Permission
 * Requires read access to the object, granted via the Authorization header.
 */
/**
 * @apiDefine secure
 * @apiHeader {String} Authorization Authorization header containing bearer access token
 * @apiHeaderExample {String} Header Example:
 * Authorization: Bearer ba0344ffd36389451c16935d57b30c6c5ec1f3dc
 * @apiError BadPermission You have insufficient permission to access this resource, check your Authorization header.
 * @apiError BadAuthentication The Authorization header contains insufficient data to authorise your request.
 */

function registerRoutes(application) {
    var config = loadRouteConfig();

    var routesLength = config.routes.length;

    for (var i = 0; i < routesLength; i++) {
        var routeItem = config.routes[i];

        var controller = loadController(routeItem);
        var route = getRoute(routeItem);
        var method = getMethod(routeItem);
        var secure = getSecure(routeItem);
        var permissions = getPermisions(routeItem);

        registerRoute(application, controller, route, method, secure, permissions);
    }

    //createConfigRoute(application);
}

function loadRouteConfig() {
    var config;

    try {
        config = require('./route.config.json');

        if (!config.routes || config.routes.length === 0) {
            throw '"routes" not defined';
        }
    }
    catch (e) {
        throw 'Unable to parse "lib/config/route.config.json": ' + e;
    }

    return config;
}

function loadController(routeItem) {
    var controller;

    if (!routeItem || !routeItem.controller) {
        throw 'Undefined "controller" property in "lib/config/route.config.json"';
    }

    try {
        controller = require(routeItem.controller);
    }
    catch (e) {
        throw 'Unable to load ' + routeItem.controller + ": " + e;
    }

    return controller;
}

function getRoute(routeItem) {
    if (!routeItem || !routeItem.route || routeItem.route.length === 0) {
        throw 'Undefined or empty "route" property in "lib/config/route.config.json"';
    }

    return '/api/v1' + routeItem.route;
}
function getSecure(routeItem) {
    if (!routeItem || routeItem.secure === undefined) {
        throw 'Undefined "secure" property in "lib/config/route.config.json"';
    }

    return routeItem.secure;
}
function getPermisions(routeItem) {
    if (!routeItem || routeItem.permissions === undefined) {
        throw 'Undefined "permissions" property in "lib/config/route.config.json"';
    }

    return routeItem.permissions;
}

function getMethod(routeItem) {
    if (!routeItem || !routeItem.method || routeItem.method.length === 0) {
        throw 'Undefined or empty "method" property in "lib/config/route.config.json"';
    }

    var method = routeItem.method.toLowerCase();

    switch (method) {
        case 'get':
        case 'put':
        case 'post':
        case 'delete':
            return method;
            break;
        default:
            throw 'Invalid REST "method" property in "lib/config/route.config.json": ' + method;
    }
}

function registerRoute(application, controller, route, method, secure, permissions) {
    if (secure) {

    }
    //FIXME: change this into being better, need to read documentation moarz...
    if (permissions.length > 0) {

    }

    application.route(route)[method](function (req, res, next) {
        try {
            Promise.resolve(controller[method](req, res, next))
                .catch(function (err) {
                    handleError(err);
                });
        } catch (err) {
            handleError(err);
        }

        function handleError(err) {

            // Respond

            if (!err) {
                res.status(500).json({error: 'Unexpected error'});
            } else if (err.name === 'ValidationError') {
                res.status(500).json({error: err.message + ': ' + err.toString()});
            } else if (err.statusCode) {
                // return http nicely
                res.status(err.statusCode).json({error: err.message});
            } else {
                res.status(500).json({error: err.toString()});
            }


            // Log

            if (!err) {
                console.log('Undefined error thrown');
            } else if (err.name === 'ValidationError') {
                console.log(err.message + ': ' + err.toString());
            } else if (err.stack) {
                console.log(err.stack);
            } else {
                console.log(err.toString());
            }
        }
    });
}

function createConfigRoute(application) {
    application.route('/config').get(function (req, res, next) {
        res.status(200).json(settingsConfig.settings);
    });
}

RouteConfig.prototype = {
    registerRoutes: registerRoutes
};

var routeConfig = new RouteConfig();

module.exports = routeConfig;
