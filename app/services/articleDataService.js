var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var EmbedlyService = require('./embedlyService');
var ArticleFactory = require('./articleFactory');

function ArticleDataService() {
	
}

var createArticlesFromData = function(articleData) {
	var articles = JSON.parse(articleData);
	var returnArticles = [];

	_.each(articles, function(article){
		var args = {
			domain: article.provider_url,
			description: article.description,
			authors: article.authors,
			images: article.images,
			language: article.language,
			url: article.url,
			original_url: article.original_url,
			title: article.title,
			entities: article.entities,
			published: article.published,
			provider_name: article.provider_name,
			content: article.content
		}

		var newArticle = ArticleFactory.createArticle(args);
		if(newArticle) {
			returnArticles.push(newArticle);
		}
	});

	return returnArticles;
}

ArticleDataService.prototype.getArticleDataFromUrl = function(url) {
	return EmbedlyService.extractDataFromUrl(url).then(
		function(articleData){
			return createArticlesFromData(articleData);
		}
	);
}

ArticleDataService.prototype.getArticleDataFromUrls = function(urls) {
	if(urls.length > 0) {
		return EmbedlyService.extractDataFromMultipleUrls(urls).then(
			function(articleData){
				return createArticlesFromData(articleData);
			}
		);
	}
	else {
		return new Promise.resolve();
	}
}

ArticleDataService.prototype.getArticleDataFromFeedItems = function(feedItems) {
	var urls = [];
	_.each(feedItems, function(feedItem){
		urls.push(feedItem.url);
	});

	return this.getArticleDataFromUrls(urls);
}

module.exports = new ArticleDataService();
