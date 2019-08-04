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
  console.log('course search running');
  console.log(response);
}


// RUN APPLICATION

callThatAPI();
console.log('working');
