var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var EmbedlyService = require('./embedlyService');
var ArticleFactory = require('./articleFactory');

function ArticleDataService() {
	
}

var createArticlesFromData = function(articleData) {
	var articles = articleData;

	if(!_.isArray(articles)) {
		articles = [articles];
	}

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

ArticleDataService.prototype.getArticleDataFromUrls = function(urls) {
	if(urls.length > 0) {
		var articleExtractionPromises = [];

		console.log('Creating article promises per url')

		_.each(urls, function(url) {
			var articlePromise = EmbedlyService.extractDataFromUrl(url);
			articleExtractionPromises.push(articlePromise);
		});

		return Promise.all(articleExtractionPromises).then(function(promiseResults) {
			console.log('Promises for articles returned');
			

			promiseResults = _.filter(promiseResults, function(promiseResult) {
				return promiseResult !== null;
			});

			var jsonParsedArticles = [];
			_.each(promiseResults, function(article){
				try {
					article = JSON.parse(article);
					jsonParsedArticles.push(article);
				}
				catch(err) {
					console.log('Error parsing article');
				}
			});

			return createArticlesFromData(jsonParsedArticles);
		});
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
