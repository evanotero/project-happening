# To-Do
## Front-End
1. Add styling for events to MyWall (figure out if all events should be loaded at once or if more should load once as user scrolls)
2. Add Form Validation to Add Events
3. Add Form Validation to Register User / Forgot Password
4. Remove Google reCaptcha from Admin Login Form
5. Add Google reCaptcha to Register User Form
6. Create and Style Admin Panel Page

## Server-Side
1. Create Events and Users Tables (add approved boolean variable to events table?  Keep track of manually added events and what users added them?)
2. Add Search Form to MyWall (Make sure to santize input)
3. Add Filtering Form to MyWall
4. Add AJAX and PHP for Register User (check if user already exists)
5. Add AJAX and PHP for Lost Password (check if user exists, then email new password)
6. Add AJAX and PHP for Add Event Form (check username/password/PRIV, then add unapproved event to SQL events)
7. Add AJAX and PHP for Admin Panel Log In Form (use sessions)
8. Add AJAX and PHP for Admins removing events from DB
9. Add AJAX and PHP for Admins editing events in DB
10. Add AJAX and PHP for Admins approving users to create events