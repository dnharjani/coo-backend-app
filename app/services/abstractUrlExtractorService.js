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

// Parses a feed in case it needs any prefixes / suffixes added to it
AbstractUrlExtractor.prototype.parseFeed = function(feed) {
	return feed;
}

// Get URLs takes a feed and requests the URL data from it
AbstractUrlExtractor.prototype.getUrls = function(feed) {
	var feed = this.parseFeed(feed);

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

// Requests and extracts urls from a feed
AbstractUrlExtractor.prototype.extractUrlsFromFeed = function(feed) {
	var self = this;
	return this.getUrls(feed).then(function(feedJson){
		console.log("Got data from feed " + feed);
		return self.extractUrlsFromJsonData(JSON.parse(feedJson.body), feed);
	});
}

// Returns true if this extractor can extract data from the given feed
AbstractUrlExtractor.prototype.canExtractFromFeed = function(feed) {
	return false;
}

// Returns the hostname of a feed url
AbstractUrlExtractor.prototype.getHostFromUrl = function(feed) {
	return URL.parse(feed).hostname;
}


module.exports = AbstractUrlExtractor


