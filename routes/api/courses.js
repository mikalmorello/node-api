const express = require('express');
const router = express.Router();

// GET DATA
var fs = require('fs');
var data;
fs.readFile('./data/Courses.json', 'utf8', function (err, contents) {
  if (err) throw err;
  data = JSON.parse(contents);
});

// COURSE ROUTE
router.get('/', function (req, res) {
  let courses = data,
      courseList = [];
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    let course = courses[key],
        courseId = key,
        courseName = courses[key].course_name;
    // Add course names to courses array
    courseList.push(courseName);
  }

  // Return JSON results if courseList array is not empty
  if(!(courseList === undefined || courseList.length == 0)){
    res.json(courseList.sort());
  } else {
    res.status(400).json({ msg: `No classes listed` });
  }
  
});

// COURSES ROUTE API
router.get('/:id', function (req, res) {
  
  let courses = data,
      searchValue = req.params.id,
      courseMatch = {};
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    let course = courses[key],
        courseId = key,
        courseName = courses[key].course_name;
    
//    console.log(`search value is ${searchValue} `);
    if(searchValue === courseName ){
      courseMatch[courseId] = course; 
    }
    
  }
  
  // Return JSON results if courseMatch object is not empty
  if(!(Object.entries(courseMatch).length === 0 && courseMatch.constructor === Object)){
    res.json(courseMatch);
  } else {
    res.status(400).json({ msg: `No courses match search query: ${searchValue}` });
  }
  
});

module.exports = router;