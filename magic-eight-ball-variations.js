#!/usr/bin/env node

var 
    prmpt = require('prompt'),
    fs = require('fs');

var welcomeMessage = "Magic Eight Ball";
console.log(welcomeMessage);

var answers = [];
var file = __dirname + '/answers.json';


fs.readFile(file, 'utf8', function (err, data) {
  if (err) { return onErr(err); }
  data = JSON.parse(data);
  for (index in data.answers) {
      answers.push(data.answers[index].value);
  }
  promptForQuestion();
});

var properties = [
	{
    name: 'value', 

    /*
     * NOTE 1 : Here, we have modified the validation regular expression to include an or-statement, 
     * such that it looks for the original question pattern, and also allows a single q as input. We 
     * can catch this q as a flag signaling the user wants to exit the app.
     */
    validator: /^[A-Z].+(\?)|q$/,

    message: '\nAsk the magic eight ball a question (q to quit)',
    required: true,
    warning: 'Whoa now, that doesn\'t seem like a proper question:\nWe must be polite to the magic eight ball,\nso please make certain you start your question with a capital and end it with a question mark.\nFor example, \"Will I win the lottery?\". Try again.'
	}
];

function promptForQuestion() {
	prmpt.start();

	prmpt.get(properties, function (err, input) {
		if (err) { return onErr(err); }

    /*
     * NOTE 2 : INPUT HANDLING > VARIATION A : Using the if statement, this would be one way of checking for 
     * the q flag to exit the process, allowing the user to quit the app. We could continue with else if and 
     * else statements here for check a number of input possibilties, that is if our validation regular 
     * expression allowed them to get this far.
     *
     * To see this variation in action, uncomment, rather, remove all the double slashes, // , from the code below up 
     * until you see END OF VARIATION A, and comment, that is, add double slashes to each line of the switch statement 
     * in VARIATION B, below.
     */

    // if (input.value === "q")
    // {
    //   process.exit(0);
    // }
    //showResponse(randomNumberBetween(0, answers.length-1));

    /*
     * END OF VARIATION A
     */

    /*
     * NOTE 3 : INPUT HANDLING > VARIATION B : Here we use a switch statement, and based on the user's input, 
     * execute the switch-case that matches, or if there's no match, execute the default path. Think of a switch 
     * like switching railroad tracks; based on the input, they allow you to head down a different path of execution.
     */
    switch (input.value) {
      case "q":
        process.exit(0);
        break;
      default:
        showResponse(randomNumberBetween(0, answers.length-1));
        promptForQuestion();
        break;
    }

    /*
     * END OF VARIATION B
     */

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
 