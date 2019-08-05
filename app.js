const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');

// GET DATA

//const data = require('Courses.json');
var fs = require('fs');
var obj;
fs.readFile('data/Courses.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

//var fs = require('fs');
//var content = fs.readFileSync('data/Courses.json', 'utf8');
//try {
//  const data = JSON.parse(content)
//  console.log(data);
//} catch(err) {
//  console.error(err)
//}
//console.log(content);


//const fs = require('fs')
//
//fs.readFile('data/test.json', 'utf8', (err, fileContents) => {
//  if (err) {
//    console.error(err)
//    return
//  }
//  try {
//    const data = JSON.parse(fileContents)
//  } catch(err) {
//    console.error(err)
//  }
//})

// USE FUNCTIONS

//var searchCourses = function(req, res, searchTerm){
//  console.log('searching...' + req);
//}
//
//app.use(searchCourses);

//app.use(bodyParser.json());

// ROUTES

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/courses/instructor/:id', function (req, res) {
  console.log('instructors are ' + req.params.id ); 
  res.send('instructors: '+ req.params.id);
})

app.get('/test', function (req, res) {
//  res.json(content);
//  res.json(data);
   res.json(obj);
})

// LISTEN

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

