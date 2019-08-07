// VARIABLES
const request = new XMLHttpRequest(),
      baseUrl = 'data/Courses.json',
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton');

let searchValue = '';

// FUNCTIONS

// API Call

function callThatAPI() {
  request.open('GET', `${baseUrl}`);
  request.send();
  request.onload = handleSuccess;
  request.onerror = handleError;
}


// API Success

function handleSuccess() {
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
        //if(instructor === searchValue){
        if (searchValue.toLowerCase() === instructor.slice(0, searchValue.length).toLowerCase()) {
          if (!coursesMatch.includes(courseId)) {
            coursesMatch.push(courseId);
          }
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


searchInput.onkeyup = function() {
  // updates the variable on each ocurrence
  searchValue = this.value; 
  
  // If input is being used
  if (searchValue.length > 0) {
    callThatAPI();
  }
}
