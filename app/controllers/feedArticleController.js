var httpError = require('http-errors');
var Promise = require('promise');
var _ = require('underscore');
var ArticleDataService = require('../services/articleDataService');
var UrlExtractorFactory = require('../services/urlExtractorFactory');
var FileService = require('../services/fileService');


function FeedArticleController() {
}

function get(req, res, next) {
	var feed = req.params.feed;

	if(!feed) {
		throw httpError(400, 'Invalid params no feed');
	}

	FileService.readFile("articles.json").then(
		function(articleData){
			res.json(articleData);
		},
		function(){
			UrlExtractorFactory.extractUrlsFromFeed(feed).then(function(feedItems){
				ArticleDataService.getArticleDataFromFeedItems(feedItems).then(function(articleData){
					res.json({articles: articleData, feed: feed});
				});
			});
		}
	);
}

function post(req, res, next) {
	var feed = req.params.feed;

	if(!feed) {
		throw httpError(400, 'Invalid params no feed');
	}

	UrlExtractorFactory.extractUrlsFromFeed(feed).then(function(feedItems){
		ArticleDataService.getArticleDataFromFeedItems(feedItems).then(function(articleData){
			FileService.writeFile("articles.json", {articles: articleData, feed: feed}).then(function(){
				res.json({success: true});
			})
		});
	});
}

function put(req, res, next) {

}


FeedArticleController.prototype = {
    get: get,
    post: post
};

module.exports = new FeedArticleController();