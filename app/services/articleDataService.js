var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var EmbedlyService = require('./embedlyService');

function ArticleDataService() {
	
}

ArticleDataService.prototype.getArticleDataFromUrl = function(url) {
	return EmbedlyService.extractDataFromUrl(url).then(
		function(articleData){
			return JSON.parse(articleData);
		}
	);
}

ArticleDataService.prototype.getArticleDataFromUrls = function(urls) {
	if(urls.length > 0) {
		return EmbedlyService.extractDataFromMultipleUrls(urls).then(
			function(articleData){
				return JSON.parse(articleData);
			}
		);
	}
	else {
		return new Promise(function (resolve, reject) { resolve({}) });
	}
	
}

module.exports = new ArticleDataService();
