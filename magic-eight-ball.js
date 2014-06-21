#!/usr/bin/env node

var 
    prmpt = require('prompt'),
    fs = require('fs');

var welcomeMessage = "Magic Eight Ball"
console.log(welcomeMessage);

var answers = [];
var file = __dirname + '/answers.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  for (index in data.answers) {
      answers.push(data.answers[index].value);
  }

  promptForQuestion();
});

var properties = [
	{
    name: 'input', 
    validator: /^[A-Z].+(\?)$/,
    message: '\nAsk the magic eight ball a question>',
    required: true,
    warning: 'Whoa now, that doesn\'t seem like a proper question:\nWe must be polite to the magic eight ball,\nso please make certain you start your question with a capital and end it with a question mark.\nFor example, \"Will I win the lottery?\". Try again.'
	}
];

function promptForQuestion() {
	prmpt.start();

	prmpt.get(properties, function (err, input) {
		if (err) { return onErr(err); }
		showResponse(randomNumberBetween(0, answers.length-1));
	});	
}

function showResponse(index) {
	console.log('The Magic Eight Ball responds: ' + answers[index]);
}

function onErr(err) {
	console.log(err);
	return 1;
}

function randomNumberBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
 