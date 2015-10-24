var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var util = require('util');
var request = require('request');
var FeedItem = require('../models/feedItem');
var AbstractUrlExtractor = require('./abstractUrlExtractorService');
var UrlFilterService = require('./urlFilterService');

function RedditUrlExtractor() {
}

util.inherits(RedditUrlExtractor, AbstractUrlExtractor);

RedditUrlExtractor.prototype.extractUrlsFromJsonData = function(json, feed) {
	return new Promise(function (resolve, reject) {
		var feedItems = [];
		if(json.data && json.data.children) {
			_.each(json.data.children, function(item){
				var item = item.data;
				if(item.domain.indexOf('self.') === -1 && UrlFilterService.allow(item.url)) {
					var feedItem = new FeedItem(item.title, item.url, feed);
					feedItems.push(feedItem);
				}
			});
		}
		resolve(feedItems);
	});
}

RedditUrlExtractor.prototype.canExtractFromFeed = function(feed) {
	var host = this.getHostFromUrl(feed);
	return host ? host.indexOf('reddit') !== -1 : false
}


module.exports = RedditUrlExtractor

