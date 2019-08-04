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
        courseArea = courses[key].course_area,
        courseTerms = courses[key].terms;
    
    // Loop through course terms
    for (const term of Object.keys(courses[key].terms)) {
      
      let termInstructors = courses[key].terms[term].instructors;
      //console.log(termInstructors);
      
      // Search for instructor
      var instructorMatch = termInstructors.find(function(instructor) {
        if(instructor === 'David Brooks'){
          console.log('course number is' + courseId );
        } 
      });
//      console.log(term);

    }
//    console.log('course area is' + courseArea );
//    console.log('course area is' + courseTerms );
  }
  
}


// RUN APPLICATION

callThatAPI();
console.log('working');
