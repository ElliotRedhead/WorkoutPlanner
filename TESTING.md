# Testing

## Testing During Development Stages

1. In initial setup stages: Heroku application crashed on startup, initial attempt at fix was removal of reference to non-existent MongoDB environmental variables. Cause of crash determined as non-existent "IP" and "PORT" variables prior to heroku deployment, problem fixed upon their addition. References to MongoDB credentials also reinstated as a result.  

2. Submission of user credentials exposed password as plaintext, as documented in git tag named: "passwordvulnerability". Fixed by use of the werkzeug security module to generate and check password hashes, database now stores passwords in hashed form.  

# DOCUMENTATION OF REMAINING GIT TAGS TO GO HERE.

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
