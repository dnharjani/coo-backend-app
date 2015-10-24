var _ = require('underscore');
var httpError = require('http-errors');
var Promise = require('promise');
var fs = require('fs');

function FileService() {
	
}

FileService.prototype.readFile = function(path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path, function(err, data) {
			if(err) {
				reject(err);
			}
			else {
				resolve(JSON.parse(data));
			}
		});
	});
}

FileService.prototype.writeFile = function(filename, data) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(filename, JSON.stringify(data), function(err) {
			if(err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
}

FileService.prototype.readFileCDN = function(url) {

}


FileService.prototype.writeFileCDN = function(url) {

}

module.exports = new FileService();
