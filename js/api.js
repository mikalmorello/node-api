// VARIABLES
const request = new XMLHttpRequest(),
      baseUrl = 'data/Courses.json',
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton');

let searchValue = '';

// FUNCTIONS

// API Call
function callThatAPI() {
  let thing = searchValue;
  request.open('GET', `${baseUrl}`);
  request.send();
  request.onload = handleSuccess;
  request.onerror = handleError;
}

// API Success
function handleSuccess(thing) {
  let response = JSON.parse(request.responseText);
  coursesSearch(response);
}

// API Error
function handleError() {
  console.log('oops');
}

// COURSE SEARCH

function coursesSearch(response){
  // Set courses to response
  let courses = response,
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
        if(instructor === searchValue){
          //console.log('course number is' + courseId + ' search value is ' + searchValue );
          coursesMatch.push(courseId);
        }
      });
    }
  }
  if(coursesMatch.length === 0){
    console.log('instructor does not exist: ' + searchValue);
  } else {
    console.log(coursesMatch);
    console.log(searchValue); 
  }
}

// RUN SEARCH ON INPUT

searchButton.addEventListener('click', function() {
  event.preventDefault();
  searchValue = searchInput.value;
  callThatAPI();
});
