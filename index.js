/* eslint-disable no-console */
/*eslint-disable no-unused-vars*/

// importing readline module
var readline = require('readline');

// initialize reading interface to read from stdin and write to stdout
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// import required mongodb driver
var MongoClient = require('mongodb').MongoClient;

// mongodb connection URL
var dbHost = 'mongodb://localhost:27017/test';

// name of collection
var myCollection = 'crud';

var dbConn;

// CRUD handlers
var bookInsertHandler = function(err, recs) {
	if (err) throw err;
	console.log('Successfully inserted book into database');
	printMenu(dbConn);
};

var bookUpdateHandler = function(err, recs) {
	if (err) throw err;
	console.log('Successfully updated book');
	printMenu(dbConn);
};

var bookDeleteHandler = function(err, recs) {
	if (err) throw err;
	console.log('Successfully deleted the book');
	printMenu(dbConn);
};

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

// inserting a new document
var insertBook = function(db) {
	rl.question('Enter name of the book: ', function(bookName) {
		rl.question('Enter ISBN of the book: ', function(isbn) {
			rl.question('Enter author(s) of the book (Comma separated if more than 1): ', function(author) {
				rl.question('Enter total number of pages: ', function(pageCount) {
					db.collection(myCollection).find({isbn: isbn}, {}, {}).toArray(
						function(err, docs) {
							if (docs.length > 0) {
								console.log('Book with ISBN ' + isbn + ' already exists');
								printMenu(dbConn);
							}
							else {
								db.collection(myCollection).insert({
									'name': bookName,
									'isbn': isbn,
									'author': author,
									'pages': pageCount
								}, bookInsertHandler);
							}
						}
					);
				});
			});
		});
	});
};

// reading records from db
var listBooks = function(db) {
	db.collection(myCollection).find({}, {}, {}).toArray(
		function(err, docs) {
			for (var index in docs) {
				console.log(docs[index]);
			}
			printMenu(dbConn);
		}
	);
};

// updating records in db
var updateBook = function(db) {
	rl.question('Enter ISBN of the book you want to update: ', function(answer) {
		db.collection(myCollection).find({isbn: answer}, {}, {}).toArray(
			function(err, docs) {
				if (docs.length == 0) {
					console.log('Book with ISBN ' + answer + ' not found');
					printMenu(dbConn);
				}
				else {
					rl.question('Enter the name of the book: ', function(bookName) {
						rl.question('Enter author(s) of the book (comma separated if more than 1): ', function(author) {
							rl.question('Enter total number of pages: ', function(pageCount) {
								db.collection(myCollection).update({isbn: answer}, {
									'name': bookName,
									'author': author,
									'pages': pageCount,
									'isbn': answer
								}, bookUpdateHandler);
							});
						});
					});
				}
			}
		);
	});
};

// deleting records from db
var deleteBook = function(db) {
	rl.question('Enter ISBN of the book you want to delete: ', function(answer) {
		db.collection(myCollection).find({isbn: answer}, {}, {}).toArray(
			function(err, docs) {
				if (docs.length == 0) {
					console.log('Book with ISBN ' + answer + ' not found');
					printMenu(dbConn);
				}
				else {
					db.collection(myCollection).remove({'isbn': answer}, bookDeleteHandler);
				}
			}
		);
	});
};

// connect to mongodb instance
MongoClient.connect(dbHost).then(function(db) {
	dbConn = db;
	printMenu();
}).catch(function(err) {
	throw err;
});
