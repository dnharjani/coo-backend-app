var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');

function FeedItem(title, url, feed) {
	this.title = title;
	this.url = url;
	this.feed = feed;
}

module.exports = FeedItem;

