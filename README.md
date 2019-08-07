
# node-api

## SEAS Course API

The Harvard John A. Paulson School of Engineering and Applied Sciences (SEAS) API uses JSON to allow for the filtering and listing of SEAS courses by **course name** and **instructor name**.

## Course API Endpoints

The SEAS Course API contains the following endpoints:

 - **/** (root) path will return all of the SEAS courses.
 - **/courses** will return a list of all SEAS course names.
 - **/courses/{courseName}** will return the course object for the specific course.  The course names can be accessed via the "/courses" endpoint.
 - **/courses/instructor** will return a list of instructors teaching SEAS courses.
 -  **/courses/instructor/{instructorName}**  will return any courses taught by the instructor / s.  The instructor names can be accessed via the "/courses/instructor" endpoint.  This endpoint is unique in that it also allows for partial searches of instructor names.  For example, 'John Doe' instructed courses will be returned if searched for by "/courses/instructor/Jo", as well as any other instructors whose names begin with "Jo".

** endpoint variables are not case sensitive.

## Course Object
The returned course objects include courses that are keyed to a unique ID. The course object includes:

 - **'unique ID'** {}
	 - course_area
	 - course_desc
	 - course_name
	 - course_title
	 - terms {}
		 - 'term name'
			 - instructors []
			 - meet_times[]
				 - {}
					 - building
					 - endTime
					 - room
					 - startTime
					 - weekDay

## Examples

An example application is hosted at the following url, using the /data/Course.json file:

[https://harvard-api.herokuapp.com](https://harvard-api.herokuapp.com)

Example Endpoints:

 - [https://harvard-api.herokuapp.com/courses/](https://harvard-api.herokuapp.com/courses/)
 - [https://harvard-api.herokuapp.com/courses/AC%20209](https://harvard-api.herokuapp.com/courses/AC%20209)
 - [https://harvard-api.herokuapp.com/courses/instructor](https://harvard-api.herokuapp.com/courses/instructor)
 - [https://harvard-api.herokuapp.com/courses/instructor/Barbara%20Grosz](https://harvard-api.herokuapp.com/courses/instructor/Barbara%20Grosz)
 - [https://harvard-api.herokuapp.com/courses/instructor/B](https://harvard-api.herokuapp.com/courses/instructor/B) (partial name search)
