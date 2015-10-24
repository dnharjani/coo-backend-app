var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var URL = require('url');

function UrlFilterService() {

}

var filteredDomains = [
	'twitter.com',
	'streamable.com',
	'i.imgur.com',
	'imgur.com',
	'translate.google.com',
	'v.cdn.vine.co',
	'youtube.com'
]

UrlFilterService.prototype.allow = function(url) {
	return !_.contains(filteredDomains, URL.parse(url).hostname);
}


module.exports = new UrlFilterService();

