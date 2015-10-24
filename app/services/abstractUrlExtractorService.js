var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');
var URL = require('url');

function AbstractUrlExtractor() {
}

// Extract Urls from Feed takes a JSON Feed and returns a promise containing a list of FeedItem Models
AbstractUrlExtractor.prototype.extractUrlsFromJsonData = function(json) {
	return new Promise(function (resolve, reject) {
		resolve([]);
	});
}

// Get URLs takes a feed and requests the URL data from it
AbstractUrlExtractor.prototype.getUrls = function(feed) {
	return new Promise(function (resolve, reject) {

		request(feed, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    resolve(response);
		  }
		  else {
		  	reject(error)
		  }
		});
	});
}

AbstractUrlExtractor.prototype.extractUrlsFromFeed = function(feed) {
	var self = this;
	return this.getUrls(feed).then(function(feedJson){
		return self.extractUrlsFromJsonData(JSON.parse(feedJson.body), feed);
	});
}

// Returns true if this extractor can extract data from the given feed
AbstractUrlExtractor.prototype.canExtractFromFeed = function(feed) {
	return false;
}

AbstractUrlExtractor.prototype.getHostFromUrl = function(feed) {
	return URL.parse(feed).hostname;
}


module.exports = AbstractUrlExtractor


