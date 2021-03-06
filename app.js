const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

//const port = 3000;
app.use(cors());

// Added for Heroku
const http = require('http');
const port = process.env.PORT || 3000

// ROUTES

// Home Route
app.use('/', require('./routes/api/home'));

// Instructor Routes
app.use('/courses/instructor', require('./routes/api/instructor'));

// Course Routes
app.use('/courses', require('./routes/api/courses'));

// LISTEN
app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

