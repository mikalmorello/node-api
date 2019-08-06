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


// USE FUNCTIONS

//app.use(bodyParser.json());


//const logger = (req, res, next) => {
//  console.log('logging... ' + req.originalUrl );
//  //console.log(req.params[0]);
//  next();
//}
//
//app.use(logger);

// ROUTES

// HOME API
app.get('/', function (req, res) {
  res.json(data);
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
        courseTerms = courses[key].terms;
    
    // Loop through course terms
    for (const term of Object.keys(courses[key].terms)) {
      
      let termInstructors = courses[key].terms[term].instructors;
      
      // Search for instructor
      var instructorMatch = termInstructors.find(function(instructor) {
        //if(instructor === searchValue){
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          if (!coursesMatch.includes(course)) {
            coursesMatch.push(course);
            
            console.log(courseId);
            console.log(course);
//            obj.courseId = course;
            
          }
        }
      });
    }
  }
  if(coursesMatch.length === 0){
    console.log('instructor does not exist: ' + searchValue);
  } else {
    //console.log(coursesMatch);
    //console.log(searchValue); 
    res.json(coursesMatch);
  }

})

// COURSES API
app.get('/courses/:id', function (req, res) {
//  res.send('courses: '+ req.params.id);
  
 let searchValue = req.params.id;
  
  // Set courses to response
  let courses = Object.entries(data),
      coursesMatch = [];
  
  // Loop through courses
//  const keys = Object.keys(courses);
  
  for (const course of courses) {

    let //course = courses[key],
        courseId = course[0],
        courseArea = course[1].course_area,
        courseTerms = course[1].terms;
    
    // Loop through course terms
    for (const term of  Object.keys(course[1].terms)) {
      
      let termInstructors = course[1].terms[term].instructors;
      
      // Search for instructor
      var instructorMatch = termInstructors.find(function(instructor) {
        //if(instructor === searchValue){
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          
          let courseNew = {};
            courseNew[course[0]] = course[1]; 
//            console.log(courseNew);
          
          if (!coursesMatch.includes(courseNew)) {
            coursesMatch.push(courseNew);
          }
        }
      });
    }
  }
  
  if(coursesMatch.length === 0){
    console.log('instructor does not exist: ' + searchValue);
  } else {
    res.json(coursesMatch);
  }
})









app.get('/test', function (req, res) {
  res.json(data);
})

// LISTEN

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`)
});

