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
      coursesMatch = [],
      coursesSet = {};
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    let course = courses[key],
        courseId = key,
        courseArea = courses[key].course_area,
        courseTerms = courses[key].terms;
    
    // Loop through course terms
    for (const term of Object.keys(courses[key].terms)) {
      let termInstructors = courses[key].terms[term].instructors;
      
      // Search for instructor's name or substring of instructors name
      const instructorMatch = termInstructors.find(function(instructor) {
      
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          if (!coursesMatch.includes(courseId)) {
            coursesMatch.push(courseId);
            coursesSet[courseId] = course; 
          }
        }
      });
    }
  }
  
  // Return JSON results
  if(coursesMatch.length === 0){
    console.log('instructor does not exist: ' + searchValue);
  } else {
    res.json(coursesSet);
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

