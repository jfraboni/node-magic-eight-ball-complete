#!/usr/bin/env node

var fs = require('fs')

var myRegexp = /(<a href=\")([A-Za-z0-9:\/._-]+)\".*(<\/a>)/g;

fs.readFile('Test.md', 'utf8', function (err,data) {
  	if (err) {
    	return console.log(err);
  	}	

  	var match = myRegexp.exec(data);

	while (match != null) {
	    // matched text: match[0]
	    // match start: match.index
	    // capturing group n: match[n]
	    match = myRegexp.exec(data);
	}

  //var result = data.replace(/string to be replaced/g, 'replacement');

  // fs.writeFile(someFile, result, 'utf8', function (err) {
  //    if (err) return console.log(err);
  // });
});