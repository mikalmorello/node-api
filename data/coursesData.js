const express = require('express');

// Get courses data from json, prepare for JS Routes

const coursesData = function(){
  var fs = require('fs');
  var data;

  fs.readFile('./data/Courses.json', 'utf8', function (err, contents) {
    if (err) throw err;
    data = JSON.parse(contents);
  });
  
};

module.exports = coursesData;