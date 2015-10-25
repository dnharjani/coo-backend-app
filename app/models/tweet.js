var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');

function Tweet(args) {
	this.title = args.title;
	this.url = args.url;
	this.content = args.content;
}

module.exports = Tweet;

