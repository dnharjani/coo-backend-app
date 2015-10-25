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

	var feedNameAsFile = FileService.convertUrlToFileName(feed);

	console.log('Reading feed from file '+ feedNameAsFile);

	FileService.readFile(feedNameAsFile).then(
		function(articleData){
			console.log('Read feed from file ' + feedNameAsFile);
			res.json(articleData);
		},
		function(){
			console.log('Couldnt read feed from file ' + feedNameAsFile);

			UrlExtractorFactory.extractUrlsFromFeed(feed).then(function(feedItems){
				console.log('Urls extracted from feed '+ feed);

				ArticleDataService.getArticleDataFromFeedItems(feedItems).then(function(articleData){
					console.log('Articles created from feed ' + feed);
					FileService.writeFile(feedNameAsFile, {articles: articleData, feed: feed}).then(function(){
						console.log('Articles written to file ' + feedNameAsFile);
						res.json({articles: articleData, feed: feed});
					});
				});
			});
		}
	);
}

FeedArticleController.prototype = {
    get: get
};

module.exports = new FeedArticleController();