var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');
var Article = require('../models/article');

function ArticleFactory() {
}

ArticleFactory.prototype.createArticle = function(args){
	return new Article(args);
}

module.exports = new ArticleFactory();

