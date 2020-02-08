# Workout Planner

## Live deployment is available [here](https://workout-exercise-planner.herokuapp.com/)

Submission for Code Institute's Data-Centric Development Milestone Project, an application for the planning and logging of workout sessions.

## User Experience

### Target Audience

- People interested in planning their workouts.
- People who want to record their workouts in a list.
- People who want to view or follow others' exercise lists.

### Project Suitability

This project is a suitable way to deliver this content because:

- An authentication feature enables ownership of settings and objects.
- Selective permissions limit user interaction with exercises they are not the owner of, preventing unauthorised editing or removal of others' exercises.
- Users have the ability to create, view, edit or delete their own exercises, and ability to clone others' exercises to their own list.
- Users can "follow" other users, and display followed users' exercises in a filtered list.

## User Stories

1. As a new user I want to create an account.
2. As an established user I want to login to access my exercises.
3. As a logged-in user I want to create a new exercise.
4. As a logged-in user I want to edit one of my exercises.
5. As a logged-in user I want to delete one of my exercises.
6. As a logged-in user I want to clone another user's exercise.
7. As a logged-in user I want to mark my exercise as complete.

### User Story Fulfilment

1. Upon loading the site the user is directed to a login page, this page is shown as a higher priority than the register page as the user may have previously registered on another device and encourages them to use an existing account if possible. As the user in this scenario does not have an account the link below the login form redirects to the register form. User-input of invalid credentials throws an error modal with feedback as to which fields are invalid. If valid credentials are entered: the user details are added to the database and the user is redirected to their exercise list. The field for email address is only required to encourage users to only create one account per person.
2. Upon loading the site the user is directed to a login page. If the user submits invalid credentials a error modal is displayed detailing the invalid field. If valid credentials are submitted the user is redirected to their list of exercises.
3. If the user is not on the "My Exercises" page, they can select "My Exercises" from the navigation bar. Selecting the "Create new exercise" button displays a form with a placeholder example for guidance. All fields require population for the form to be submitted, upon successful submission a modal is displayed and the user is redirected to their exercise list.
4. The user can select the "Edit" button on exercise cards they are the owner of, this redirects to a form to alter the individual properties of the exercise. Upon valid population of required fields and activation of the "Confirm" button
5. The user can select the "Delete" button on exercise cards they are the owner of, the target exercise is removed from the database and the user is redirected to their list of exercises.
6. The "Clone" button is available for all exercise cards, regardless of the owner. Activation of the clone button directs the user to a form with all properties pre-filled with the properties of the cloned exercise, the user has the option to edit the exercise properties before activating the "Confirm" button. Upon confirmation, the new exercise is added to the user's list. If an exercise has been cloned accidentally the user has the option to delete the new exercise.
7. The owner of the exercise has the "Complete" button available for activation on the exercise card. Upon activation: the style of the card is updated to reflect the new completed state as has been updated in the database.

## Design & Styling

### Colour Palette

The initial website design concepts have been formed with the following colour palette:  
![#0f1011](https://placehold.it/15/0f1011/000000?text=+) `#0f1011`  
![#615F5B](https://placehold.it/15/615F5B/000000?text=+) `#615F5B`  
![#A2A29F](https://placehold.it/15/A2A29F/000000?text=+) `#A2A29F`  
![#FBFBFB](https://placehold.it/15/FBFBFB/000000?text=+) `#FBFBFB`  
![#2B5630](https://placehold.it/15/2B5630/000000?text=+) `#2B5630`  
![#04A647](https://placehold.it/15/04A647/000000?text=+) `#04A647`

The chosen palette defines the site as a predominantly dark-themed design with lighter colours used to highlight / segment components.

## Wireframes

<details>
<summary> Project Inception Wireframes </summary>

Basic wireframes have been created upon project inception to aid in the planning stages of this project, these are to be adapted as the project proceeds with further iterations for multiple breakpoints.

#### Mobile Wireframe

![Mobile Inception Wireframe](./static/wireframes/Mobile-List.png)

#### Desktop Wireframe

![Desktop Inception Wireframe](./static/wireframes/Desktop-WeeklyList.png)
</details>

## Features

### Existing Features

#### Feature 1

#### Feature 2

#### Feature 3

### Potential Features to Implement

The following are suggested additions that would exceed the project time constraints or require inaccessible resources but that would provide additional value to the project.

#### Feature 1

#### Feature 2

## Technologies Used

- HTML, CSS and Javascript are used for creating the frontend structure blocks, styling and logic of this site.
- [jQuery](https://jquery.com/) is primarily used within this project for ease of DOM manipulation.
- [Bootstrap](https://getbootstrap.com) is used for resolution responsiveness and for general structuring of the UI.
- [Flask](https://www.fullstackpython.com/flask.html) is a Python-based framework used for the implementation of templates for components and page structures within this project.
- [MongoDB](https://www.mongodb.com/) was used to store the no-SQL database.
- [PyMongo](https://api.mongodb.com/python/current/) was used to manage/interact with the MongoDB database.
- [Git](https://git-scm.com/) is used for the version control of this project.
- [Font Awesome](https://fontawesome.com/) provide all icons used in buttons, e.g. complete, clone, edit, delete.
- [Google Fonts](https://fonts.google.com/) is used to supply the main font for the majority of this website, the font sourced through this service is named Bebas Neue.

### Testing

Testing documentation is located in the [testing.md file.](./testing.md)

### Known Bugs & Limitations

Are there any features that don't perform as expected, is the discovery documented through testing section, are potential solutions noted?

## Deployment

This project was developed using Visual Studio Code, and was both committed to git and pushed to GitHub using the integrated source control feature.

The setup for the GitHub Pages deployment was as follows:

- Log into Github.
- Select the target repository from the list.
- Select "Settings" from the menu items.
- Scroll to the Github Pages section.
- Under "Source" click the drop-down that is set to "None" and select "Master Branch".
- The link to the website is now displayed under the "Github Pages" section.

At the time of submission are both the deployed and development versions of this project identical?

## Run this Project Locally:

## Credits

### Additional Resources

The main font applied to this site is: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)
The images used in this site were obtained from the following sources:

- [Geometric architecture image by Scott Webb, sourced from Pexels](https://www.pexels.com/photo/abstract-architecture-building-exterior-geometric-593158/)

### Acknowledgements

#### Disclaimer

This project and its contents are for educational purposes only.
