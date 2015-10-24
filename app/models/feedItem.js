var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');

function FeedItem(url) {
	this.url = url;
}

module.exports = FeedItem;

