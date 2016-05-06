# Project Happening

![](https://github.com/CSCI2254/project-happening/blob/master/img/happeninglogo.png)

## Description
Final Project for Web Applications Development (CSCI2254, Spring 2016).

### Summary
A web application for Boston College students to view, search, and add all events that are occurring on, or near, campus.

### Application & Code Explained
- **Application Dependencies**: jQuery, Boston College OrgSync RSS, Bootstrap DatePicker v4 (Moment.js), Bootstrap v3.3.6, Google Fonts API, Google reCAPTCHA, Google Analytics, and Font Awesome v4.0.3.
- 1500+ lines of _CSS_, 900+ lines of _JavaScript_ & _jQuery_, 900+ lines of _PHP_, and 350+ lines of _HTML_
- Custom background, logo, and favicon designed and created using Adobe Photoshop CC & Adobe Illustrator CC.
- Complete mobile support with styling designed for touch screens:
<img src="https://github.com/CSCI2254/project-happening/blob/master/img/mobilemockup.png" width="400px"/>

### URL
- **Main Website**: http://cscilab.bc.edu/~takc/happening/index.html.
- **Admin Panel**: http://cscilab.bc.edu/~takc/happening/admin/index.php.

### Proposal Documents
Proposal Documents can be found on the [_About_](https://github.com/CSCI2254/project-happening/wiki/About) page in the wiki.

### Future
- Add support for the Boston College event calendar: http://events.bc.edu/calendar.xml.
- Add support for events only posted on Facebook by Boston College student groups.
- Increase the search capability and allow more filtering options.

Copyright 2016 Evan Otero, Clinton Tak, Sinclair Jones

## Grading
4/11
- Looks good.  I really like the wiki.

RUBRIC - For Data Documentation
CRITERIA:
Create SQL Complete for all tables. Table names and field names well
chosen, clearly presented.
COMMENTS:
You only have two tables, and no relationship between them. In the wiki,
your mockups indicate a lot more data than that, for example selecting a 
college.  There should be a list of colleges somewhere.  It also seems
that there should be a relationship between users and events.  With
just the two tables, how do you know who created an event?  You also imply
organizations can create events.  Should organizations have a relationship
with users?  For example, should an organization be able to notify
a user that an event has been inserted?
SCORE: 4 / 5 pts 
**********************
CRITERIA:
Populate SQL Complete - data is representative. All associations have
specific records demonstrating their relationships.
COMMENTS:
createuserinsertion.sql should have real data.
Your mockup data is fine, but add a smaller set with more meaningful 
info.  You will need to add more as you improve the relationships in
your data.
SCORE: 5 / 5 pts 
**********************
CRITERIA:
All use cases documented with actor, pre/post conditions, queried and UI
mockup - there must be a sufficient number of use cases to receive full
credit. Five is the absolute minumum. Is the purpose and function of the
use case clear?
COMMENTS:
Completely missing.  Your pre and post are for actors only, not for the
actual use cases.
SCORE: 0 / 30 pts 
**********************
CRITERIA:
Is purpose and function of the project clear? Note this is only 5
points, but its really crucial.
COMMENTS:
Yes, but the data model does not support it.
SCORE: 5 / 5 pts 
**********************
CRITERIA:
Data documentation includes a ER diagram.
COMMENTS:
Yes, but it needs substantial work
SCORE: 5 / 5 pts 
**********************
Total Points: 20 out of 50
