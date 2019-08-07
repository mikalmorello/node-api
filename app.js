const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// ROUTES

// HOME ROUTE
app.get('/', function (req, res) {
  res.send('homepage');
});

// INSTRUCTOR ROUTES
app.use('/courses/instructor', require('./routes/api/instructor'));

// COURSES ROUTES
app.use('/courses', require('./routes/api/courses'));

// LISTEN
app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

