var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var request = require('request');

function EmbedlyService(apiKey) {
	this.apiKey = apiKey || "b49730e3de194fc1a1411ccc6cb44a1c";
	this.apiUrl ="http://api.embed.ly/1/extract?key="+this.apiKey+"&format=json";
}

EmbedlyService.prototype.extractDataFromUrl = function(url) {
	var requestUrl = this.apiUrl+'&url='+url;
	return new Promise(function (resolve, reject) {
		request(requestUrl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		   	resolve(body);
		  }
		  else {
		  	reject(error)
		  }
		});
	});
}

EmbedlyService.prototype.extractDataFromMultipleUrls = function(urls) {
	var requestUrl = this.apiUrl+'&urls=';
	for(var i = 0; i < urls.length; i++) {
		requestUrl = requestUrl + urls[i]  + (i < urls.length-1 ? ',' : '');
	}

	return new Promise(function (resolve, reject) {
		request(requestUrl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		   	resolve(body);
		  }
		  else {
		  	reject(error)
		  }
		});
	});
}

module.exports = new EmbedlyService();
