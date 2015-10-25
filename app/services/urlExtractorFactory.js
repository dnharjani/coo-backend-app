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
	console.log('Getting extractor for feed '+ feed);
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
			console.log('Extractor found for feed '+feed);
			return extractor.extractUrlsFromFeed(feed).then(function(feedItems){
				console.log('Feed items extracted from feed' + feed);
				resolve(feedItems);
			});
		}
		else {
			resolve([]);
		}
	});
}



module.exports = new UrlExtractorFactory();

