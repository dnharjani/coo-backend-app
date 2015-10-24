var httpError = require('http-errors');
var Promise = require('promise');
var _ = require('underscore');
var ArticleDataService = require('../services/articleDataService');

function ArticleController() {
}

function get(req, res, next) {
	var url = req.params.url;

	if(!url) {
		throw httpError(400, 'Invalid params no url');
	}

	ArticleDataService.getArticleDataFromUrls([url, url]).then(function(articleData){
		res.json(articleData);
	});
}

function post(req, res, next) {

}

function put(req, res, next) {

}


ArticleController.prototype = {
    get: get
};

module.exports = new ArticleController();