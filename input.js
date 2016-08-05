/* eslint-disable no-console */

// importing readline module
var readline = require('readline');

// initialize reading interface to read from stdin and write to stdout
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// dealing with user input
rl.question('What is your name? ', function (answer) {
	console.log('Your name is: ' + answer);
	console.log('Press Ctrl+C to end the program.');
});
