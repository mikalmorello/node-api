const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// ROUTES

// HOME API
app.get('/', function (req, res) {
  res.send('homepage');
});


app.use('/courses/instructor', require('./routes/api/instructor'));

// COURSES API
app.get('/courses/:id', function (req, res) {
  res.send('courses: '+ req.params.id);
});


// LISTEN

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

