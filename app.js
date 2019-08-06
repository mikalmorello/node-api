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
  

  // Assign initial variables
  let courses = data,
      searchValue = req.params.id,
      coursesMatch = {};
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    let course = courses[key],
        courseId = key,
        courseTerms = courses[key].terms;
    
    // Loop through course terms
    for (const term of Object.keys(courseTerms)) {
      let termInstructors = courses[key].terms[term].instructors;
      
      // Search for instructor's name
      const instructorMatch = termInstructors.find(function(instructor) {
        // Check substring of instructors name
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          // If course does not already exist in object, add it
            if(!coursesMatch.hasOwnProperty(courseId)){
              coursesMatch[courseId] = course; 
            }
        }
      });
    }
  }
  
  // Return JSON results
    res.json(coursesMatch);

})

// COURSES API
app.get('/courses/:id', function (req, res) {
  res.send('courses: '+ req.params.id);
});


// LISTEN

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

