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



module.exports = new UrlExtractorFactory();

