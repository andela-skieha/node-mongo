/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// printing the menu
var printMenu = function(db) {
	console.log('Welcome to CRUD demo using Node.js nd MongoDB.');
	console.log('1. Insert a new book.');
	console.log('2. List all the books.');
	console.log('3. Update book by ISBN.');
	console.log('4. Delete book by ISBN.');
	console.log('5. Quit.');
	rl.question('Enter your choice: ', function(answer) {
		console.log('Choice entered is: ' + answer);
		switch (answer) {
		case '1':
			insertBook(dbConn);
			break;
		case '2':
			listBooks(dbConn);
			break;
		case '3':
			updateBook(dbConn);
			break;
		case '4':
			deleteBook(dbConn);
			break;
		case '5':
			console.log('Press Ctrl+C to exit the program.');
			return;
		}
	});
};
