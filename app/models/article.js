var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');

function Article(args) {
	this.domain = args.provider_url;
	this.description = args.description;
	this.authors = args.authors;
	this.images = args.images;
	this.language = args.language;
	this.url = args.url;
	this.original_url = args.original_url;
	this.title = args.title;
	this.entities = args.entities;
	this.published = args.published;
	this.provider_name = args.provider_name;
	this.content = args.content;
}

module.exports = Article;

