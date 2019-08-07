const express = require('express');
const router = express.Router();

// DEFAULT ROUTE
var fs = require('fs');
var data;
fs.readFile('./data/Courses.json', 'utf8', function (err, contents) {
  if (err) throw err;
  data = JSON.parse(contents);
});

// COURSE ROUTE
router.get('/', function (req, res) {
//  res.send('homepages');
  let courses = data;
  
  // Return JSON results if courses object is not empty
  if(!(Object.entries(courses).length === 0 && courses.constructor === Object)){
    res.json(courses);
  } else {
    res.status(400).json({ msg: `No courses listed` });
  }
  
});

module.exports = router;