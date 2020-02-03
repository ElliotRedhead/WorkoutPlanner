# Testing

1. In initial setup stages: Heroku application crashed on startup, initial attempt at fix was removal of reference to non-existent mongoDB environmental variables. Cause of crash determined as non-existent "IP" and "PORT" variables prior to heroku deployment, problem fixed upon their addition. References to mongoDB credentials also reinstated as a result.

2. Submitting of user credentials exposed password as plaintext, as documented in git tag named: "passwordvulnerability". Fixed by use of the werkzeug security module to generate and check password hashes, database now stores passwords in hashed form.

x. Code Validators  

Have [W3C](https://www.w3.org/) validators been used for both HTML and CSS checking?

Has [JSHint](https://jshint.com/) been used by recommendation of The Code Institute to validate the Javascript?