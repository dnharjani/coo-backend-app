var httpError = require('http-errors');
var Promise = require('promise');
var _ = require('underscore');
var UrlExtractorFactory = require('../services/urlExtractorFactory');

function FeedController() {
}

function get(req, res, next) {
	var feed = req.params.feed;

	if(!feed) {
		throw httpError(400, 'Invalid params no feed');
	}

	var extractor = UrlExtractorFactory.getExtractorForFeed(feed);
	if(extractor) {
		extractor.extractUrlsFromFeed(feed).then(function(feedItems){
			res.json(feedItems);
		});
	}
	else {
		res.json({'feedItems': []});
	}
		
}

function post(req, res, next) {

}

function put(req, res, next) {

}


FeedController.prototype = {
    get: get
};

module.exports = new FeedController();