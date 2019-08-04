// VARIABLES
const request = new XMLHttpRequest(),
      baseUrl = 'data/Courses.json';

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
  var response = JSON.parse(request.responseText);
  courseaSearch(response);
}

// API Error
function handleError() {
  console.log('oops');
}

// COURSE SEARCH

function courseaSearch(response){
//  console.log('course search running');
//  console.log(response);
  // Set courses to response
  let courses = response;
  
  // Loop through courses
  for (const key of Object.keys(courses)) {
    //console.log(key, courses[key]);
    let course = courses[key],
        courseId = key,
        courseArea = courses[key].course_area;
    console.log('course number is' + courseId );
    console.log('course area is' + courseArea );
  }
  
}


// RUN APPLICATION

callThatAPI();
console.log('working');
