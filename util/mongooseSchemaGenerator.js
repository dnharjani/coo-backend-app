var fileIn = process.argv[2];

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(fileIn, 'utf8'));

