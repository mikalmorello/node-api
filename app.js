const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// GET DATA

var fs = require('fs');
var data;
fs.readFile('data/Courses.json', 'utf8', function (err, contents) {
  if (err) throw err;
  data = JSON.parse(contents);
});

// ROUTES

// HOME API
app.get('/', function (req, res) {
  res.send('homepage');
});


// INSTRUCTOR API
app.get('/courses/instructor/:id', function (req, res) {
  
 let searchValue = req.params.id;
  
  // Set courses to response
  let courses = data,
      coursesMatch = [];
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    let course = courses[key],
        courseId = key,
        courseArea = courses[key].course_area,
        courseTerms = courses[key].terms,
        courseNew = {};
    
    // create course object
    courseNew[courseId] = course; 
    console.log(courseNew);
    
    // Loop through course terms
    for (const term of Object.keys(courses[key].terms)) {
      let termInstructors = courses[key].terms[term].instructors;
      
      // Search for instructor
      var instructorMatch = termInstructors.find(function(instructor) {
        //if(instructor === searchValue){
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          if (!coursesMatch.includes(courseNew)) {
            coursesMatch.push(courseNew);
          }
        }
      });
    }
  }
  
  // Return JSON results
  if(coursesMatch.length === 0){
    console.log('instructor does not exist: ' + searchValue);
  } else {
    res.json(coursesMatch);
  }

})

// COURSES API
app.get('/courses/:id', function (req, res) {
  res.send('courses: '+ req.params.id);
});


// LISTEN

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

