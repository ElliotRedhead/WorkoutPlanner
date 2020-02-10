# Testing

1. In initial setup stages: Heroku application crashed on startup, initial attempt at fix was removal of reference to non-existent MongoDB environmental variables. Cause of crash determined as non-existent "IP" and "PORT" variables prior to heroku deployment, problem fixed upon their addition. References to MongoDB credentials also reinstated as a result.

2. Submission of user credentials exposed password as plaintext, as documented in git tag named: "passwordvulnerability". Fixed by use of the werkzeug security module to generate and check password hashes, database now stores passwords in hashed form.

3. Registering with invalid credentials: Attempts to register with combinations of existing usernames or emails returns a display modal with the corresponding invalid field, the user is not added to the session and unauthorised access is not enabled.

4. Registering with valid credentials: User submission of fields containing a username and email that do not already exist and a password results in successful redirection to the user's exercise list and authorised access to the remainder of the site.

5. Login with invalid credentials: Attempts to login with a username that does not exist in the database displays a modal stating the username does not exist, the user is not added to the session and unauthorised access is not enabled. Attempts to login with an existing username displays a modal stating that the password is incorrect, the user is not added to the session and unauthorised access is not enabled.

6. Login with valid credentials: User submission of fields containing an existing username and its matching password correctly results in the user being added to the session and redirection to their exercise list as their access is now authorised.
   


x. Code Validators  

Have [W3C](https://www.w3.org/) validators been used for both HTML and CSS checking?

Has [JSHint](https://jshint.com/) been used by recommendation of The Code Institute to validate the Javascript?
