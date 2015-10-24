var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var RedditUrlExtractor = require('./redditUrlExtractorService');

function UrlExtractorFactory() {
	this.extractors = [
		new RedditUrlExtractor()
	] 
}

UrlExtractorFactory.prototype.getExtractorForFeed = function(feed) {
	var foundExtractor = null;
	_.each(this.extractors, function(extractor){
		if(extractor.canExtractFromFeed(feed)) {
			foundExtractor = extractor;
		}
	});

	return foundExtractor;
}

UrlExtractorFactory.prototype.extractUrlsFromFeed = function(feed) {
	var self = this;
	return new Promise(function (resolve, reject) {
		var extractor = self.getExtractorForFeed(feed);
		if(extractor) {
			return extractor.extractUrlsFromFeed(feed).then(function(feedItems){
				resolve(feedItems);
			});
		}
		else {
			resolve([]);
		}
	});
}



module.exports = new UrlExtractorFactory();

