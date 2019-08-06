const express = require('express');
const router = express.Router();
const coursesData = require('../../data/coursesData');

// GET DATA

var fs = require('fs');
var data;
fs.readFile('./data/Courses.json', 'utf8', function (err, contents) {
  if (err) throw err;
  data = JSON.parse(contents);
});

// GET INSTRUCTORS
router.get('/', function (req, res) {
  res.send('instructor');
});

// GET INSTRUCTOR TAUGHT COURSES
router.get('/:id', function (req, res) {
  
  // Assign initial variables
  let courses = data,
      searchValue = req.params.id,
      courseMatch = {};

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
            if(!courseMatch.hasOwnProperty(courseId)){
              courseMatch[courseId] = course; 
            }
        }
      });
    }
  }
  
  // Return JSON results if courseMatch object is not empty
  if(!(Object.entries(courseMatch).length === 0 && courseMatch.constructor === Object)){
    res.json(courseMatch);
  } else {
    res.status(400).json({ msg: `No instructor names match search query: ${searchValue}` });
  }

});

module.exports = router;