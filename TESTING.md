# Testing

## Testing During Development Stages

1. In initial setup stages: Heroku application crashed on startup, initial attempt at fix was removal of reference to non-existent MongoDB environmental variables. Cause of crash determined as non-existent "IP" and "PORT" variables prior to heroku deployment, problem fixed upon their addition. References to MongoDB credentials also reinstated as a result.  

2. Submission of user credentials exposed password as plaintext, as documented by git tag named: ["passwordvulnerability"](https://github.com/ElliotRedhead/WorkoutPlanner/commit/e32d8243e62d17773eaa5ded8ed011aa644b61b3). Fixed by use of the werkzeug security module to generate and check password hashes, database now stores passwords in hashed form.  

3. Incomplete values were visible on the exercise cards when placeholders were inserted from MongoDB, this was due to missing quotation marks surrounding the Jinja variable. The fix was documented by git tag: ["placeholdercorrection"](https://github.com/ElliotRedhead/WorkoutPlanner/commit/2807effb03a2b12a04d66af9e30d09172239a443).

4. In early iterations of edit-exercise capabilities: a user could theoretically manipulate the URL to edit another user's exercise cards without adequate permissions. The fix for this was to specify that the owner of the exercise must match the name of the user in the session to update the database. The fix is documented by the ["preventurlmanipulation"](https://github.com/ElliotRedhead/WorkoutPlanner/commit/e08ccae742315dc966b46f4acd5fb90cc7f0be06) tag.

5. A good example of re-using a form template in this project is noted in the ["flaskformtemplatecapability"](https://github.com/ElliotRedhead/WorkoutPlanner/commit/9fd7468c44a1b987dea819936a8f08df2e730192) tag, wherein variables are passed to fill a template based on the user's route. At that stage the variables were successfully passed to populate the target form.

6. The tag ["exercisecompletefunction"](https://github.com/ElliotRedhead/WorkoutPlanner/commit/64b899f367bb138397115ce7d5b0e5bba3c891db) documents a boolean trigger used to selectively apply a class to an element, this was successful in style manipulation based on a database record.

7. A great obstacle met in this project was introduced with javascript-based redirects in place of the Flask redirects used as a standard. The site would at times redirect using a "http" protocol rather than the more-secure "https", this mixed-content would produce an error in browsers and prevent users from accessing the site. The main difficulty for this issue was in the diagnosis, the bug's appearance was dependent upon whether the application was accessed via a debug process in an IDE, a standard running of the python application or running through Heroku. In addition to this, it was then a selective-issue based on the user's security level set in their browser, so replication for troubleshooting was time-intensive. Troubleshooting was concluded with the application of [user aldel's solution provided on Stack Overflow](https://stackoverflow.com/a/37842465). The final line to test that this was indeed successful was git tagged [here](https://github.com/ElliotRedhead/WorkoutPlanner/commit/024cb1f40e744fc45a9611d02b9c294fd1630c8a) for traceability, and the user noted in both the app.py comments and acknowledgements section of the README.

## Testing at Release-Stage

1. Registering with invalid credentials: Attempts to register with combinations of existing usernames or emails returns a display modal with the corresponding invalid field, the user is not added to the session and unauthorised access is not enabled.  

2. Registering with valid credentials: User submission of fields containing a username and email that do not already exist and a password results in successful redirection to the user's exercise list and authorised access to the remainder of the site.  

3. Login with invalid credentials: Attempts to login with a username that does not exist in the database displays a modal stating the username does not exist, the user is not added to the session and unauthorised access is not enabled. Attempts to login with an existing username displays a modal stating that the password is incorrect, the user is not added to the session and unauthorised access is not enabled.  

4. Login with valid credentials: User submission of fields containing an existing username and its matching password correctly results in the user being added to the session and redirection to their exercise list as their access is now authorised.  

5. In the edit or creation of an exercise, submission of the form requires all input fields to be filled, this prevents blank fields from being submitted to the database. Fulfilment successfully feeds back creation to user.  

6. Cloning of others' exercises correctly assigns the current user in session to a duplicate of the original exercise and feedback is visible for this change.  

7. In the addition of user to follow: the target username is correctly added to an array for the current user in session, the target users' exercise cards are available in the followed page as a result.  

8. In the removal of followed user: the target username is correctly removed from the current user in session's followed array, the target users' exercise cards are not displayed on the followed page as a result.  

## Code Validation  

Linters and formatters were used throughout the development of this project.  

* The [Prettier](https://prettier.io/) formatter was used to format HTML/CSS files and check for errors.  
* [ESLint](https://eslint.org/) was used for linting of the Javascript file.  
* [pylint](https://www.pylint.org/) was used for linting of the Python file.  

Upon project completion there are false-positive errors reported by the linting tools, these have been assessed and determined to not require rectifying.
