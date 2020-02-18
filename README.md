# Workout Planner

## Live deployment is available [here](https://workout-exercise-planner.herokuapp.com/)  

At the time of writing/submission: the deployed version is identical to the development version.

## Introduction

An exercise planner. This site give you a platform to plan your exercises, view others' exercises and copy exercise ideas with the ability to personalise exercises to your own needs.  

This project focuses on the data-driven aspects of development, a NoSQL database (MongoDB) is utilised to store user and exercise data.

## Table of Contents

- [Workout Planner](#workout-planner)
	- [Live deployment is available here](#live-deployment-is-available-here)
	- [Introduction](#introduction)
	- [Table of Contents](#table-of-contents)
	- [User Experience](#user-experience)
		- [Target Audience](#target-audience)
		- [Project Suitability](#project-suitability)
	- [User Stories](#user-stories)
		- [User Story Scope](#user-story-scope)
		- [User Story Fulfilment](#user-story-fulfilment)
	- [Design & Styling](#design--styling)
		- [Colour Palette](#colour-palette)
	- [Wireframes](#wireframes)
		- [Inception Mobile Wireframe](#inception-mobile-wireframe)
		- [Inception Desktop Wireframe](#inception-desktop-wireframe)
		- [Release Mobile Wireframes](#release-mobile-wireframes)
		- [Release Desktop Wireframes](#release-desktop-wireframes)
	- [Features](#features)
		- [Existing Features](#existing-features)
			- [Authentication](#authentication)
			- [Management of Own Exercises](#management-of-own-exercises)
			- [Accessibility to Global Exercises](#accessibility-to-global-exercises)
			- [Accessibility to Followed Users' Exercises](#accessibility-to-followed-users-exercises)
		- [Potential Features to Implement](#potential-features-to-implement)
			- [Password Reset](#password-reset)
			- [Advanced Exercise Filtering](#advanced-exercise-filtering)
			- [Batch Updating of Records](#batch-updating-of-records)
			- [Profanity Filter](#profanity-filter)
	- [Technologies Used](#technologies-used)
	- [Testing](#testing)
	- [Database Structure](#database-structure)
		- [Users Collection](#users-collection)
		- [Exercises Collection](#exercises-collection)
	- [Deployment](#deployment)
		- [Local Deployment](#local-deployment)
			- [Pre-Requisites](#pre-requisites)
		- [Deployment Steps](#deployment-steps)
		- [Deployment to Heroku](#deployment-to-heroku)
	- [Credits](#credits)
		- [Additional Resources](#additional-resources)
		- [Acknowledgements](#acknowledgements)
			- [Disclaimer](#disclaimer)

----

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

### User Story Scope

1. As a new user I want to create an account.  

2. As an established user I want to login to access my exercises.  

3. As a logged-in user I want to create a new exercise.  

4. As a logged-in user I want to edit one of my exercises.  

5. As a logged-in user I want to delete one of my exercises.  

6. As a logged-in user I want to clone another user's exercise.  

7. As a logged-in user I want to mark my exercise as complete.  

8. As a logged-in user I want to add a new user to my "followed" list.  

9. As a logged-in user I want to remove a user from my "followed" list.  

### User Story Fulfilment

1. Upon loading the site for the first time: the user is directed to a welcome page with links to both register/login pages, upon selecting the option to register the user is redirected to a register form. User-input of invalid credentials throws an error modal with feedback as to which fields are invalid. If valid credentials are entered: the user details are added to the database and the user is presented with a modal to either go to their own exercise list or view all exercises. The field for email address is only required to encourage users to only create one account per person.  

2. Upon loading the site the user is directed to a login page this page is shown as a higher priority than the register page as the user may have previously registered on another device and encourages them to use an existing account if possible. If the user submits invalid credentials a error modal is displayed detailing the invalid field. If valid credentials are submitted a modal is displayed with options to either go to their own exercise list or view all exercises.  

3. The user can create a new exercise from most pages once logged-in by selecting the "Create new exercise" button at the top of the page. On button press: a form with a placeholder example is displayed for guidance. All fields require population for the form to be submitted, upon successful submission a modal is displayed and the user is redirected to their exercise list.  

4. The user can select the "Edit" button on exercise cards they are the owner of, this redirects to a form to alter the individual properties of the exercise. Upon valid population of required fields and activation of the "Confirm" button a modal feedbacks that a new exercise has been created.  

5. The user can select the "Delete" button on exercise cards they are the owner of, the target exercise is removed from the database and the user is redirected to their list of exercises. A response modal is not shown for this function as the user can see in their list that the card has been successfully removed during the redirect.  

6. The "Clone" button is available for all exercise cards, regardless of the owner. Activation of the clone button directs the user to a form with all properties pre-filled with the properties of the cloned exercise, the user has the option to edit the exercise properties before activating the "Confirm" button. Upon confirmation, the new exercise is added to the user's list and a modal is displayed to provide feedback to the user.  

7. The owner of the exercise has the "Complete" button available for activation on the exercise card. Upon activation: the style of the card is updated to reflect the new completed state as has been updated in the database.  

8. Accessing the "followed users" page from the navbar displays a page of any existing followed user cards. Ensuring the toggle in the top-right is set to "add user" allows the user to type the name of the target user in the text box below that. Upon selecting the plus button, the target user is added to the followed user list and their cards are displayed on the page also.  

9. Accessing the "followed users" page from the navbar displays a page of any existing followed user cards. Ensuring the toggle in the top-right is set to "remove user" allows the user to select the target user from the dropdown list. After selecting the target user: activating the minus button removes the target user from the followed user list, the corresponding exercise cards are no longer displayed on the page.  

## Design & Styling

### Colour Palette

The final website design has been customised with the following colour palette:  
![#1B1B1B](https://placehold.it/15/1B1B1B/000000?text=+) `#1B1B1B`:  This black is the standard colour used for the navbar background and text in modal alerts. Variations in the opacity of the black are used for different applications on this site e.g. welcome page black overlay. This colour is used to generate contrast with a lighter background.  
![#555555CB](https://placehold.it/15/555555CB/000000?text=+) `#555555CB`: This grey is used for styling the background of exercise cards, it provides a neutral, non-obtrusive background so as to not distract users from the displayed details.  
![#DBB125](https://placehold.it/15/DBB125/000000?text=+) `#DBB125`: This gold is used as an accenting colour, generally used for colour contrast. This is used extensively for user feedback of hover and click functions.  
![#FFFFFF](https://placehold.it/15/FFFFFF/000000?text=+) `#FFFFFF`: This white is used for greater contrast against darker backgrounds and gives a strong, bright highlight of elements it is applied to.  

The chosen palette defines the site as a predominantly dark-themed design with lighter colours used to highlight / segment components.

## Wireframes

<details>
<summary> Project Inception Wireframes </summary>

Basic wireframes have been created upon project inception to aid in the planning stages of this project, these are to be adapted as the project proceeds with further iterations for multiple breakpoints.

### Inception Mobile Wireframe

[Generic Exercises](https://ibb.co/gdkCwMz)

### Inception Desktop Wireframe

[Generic Exercises](https://ibb.co/1J152tX)
</details>  

Evolution of project scope required adaptation of the basic inception wireframes to plan for final iterations.  
Most notably, wireframes were generated for required forms and the first-time welcome page with absence of dates/calendar function.  
As a project decision resulted in the removal of date-specific exercises the new wireframes were updated to account for this change in plan.  

Release-stage wireframes below give an idea of the general mobile and desktop breakpoints, the site was designed with a mobile-first perspective but there is little variation in the structure after the resolution increases further than tablet recommendations.

<details>
<summary> Release-Stage Wireframes </summary>

### Release Mobile Wireframes

- [Welcome](https://ibb.co/qg3VFry)  
- [Register](https://ibb.co/94Sztst)  
- [Login](https://ibb.co/hKBCCCK)  
- [Generic Exercises](https://ibb.co/k9Mmp4N)  
- [Exercise Form](https://ibb.co/WPLb0v2)  
- [Followed Exercises](https://ibb.co/dgYYvdF)  

### Release Desktop Wireframes

- [Welcome](https://ibb.co/4RfSTpZ)  
- [Register](https://ibb.co/x1bw901)  
- [Login](https://ibb.co/SPPjZPv)  
- [Generic Exercises](https://ibb.co/qWtzmtR)  
- [Exercise Form](https://ibb.co/ykQq2n5)  
- [Followed Exercises](https://ibb.co/cT4b13K)  

</details>

## Features

### Existing Features

#### Authentication

Access to the website is restricted to registered users. Upon loading: users are presented with option to register a new account or login with an existing account. Once the user has submitted valid credentials their login state is persisted across the session and the option to logout is available via a button in the navbar.

#### Management of Own Exercises

The site allows users to create, view, edit or delete their own exercises. Each exercise can be personalised to include details of the exercise name, target muscle, equipment used and a metric of intensity measured by either weight or distance. Upon completion the user can mark the exercise as completed.

#### Accessibility to Global Exercises

Accessing the global page shows all users' exercise cards, the user then has the option to clone those exercises to their own list if they want to.

#### Accessibility to Followed Users' Exercises

The followed users page allows the user to manage their followed users. The exercise cards owned by followed users are displayed, these can be cloned to the own user's list.

### Potential Features to Implement

In its current state the project fulfils the initial requirements, demonstrating management of a database based on user input with a defined user case of forming an exercise to-do list and visibility of others' lists.
The following are suggested additions that would exceed the project time constraints or require inaccessible resources but that would provide additional value to the project if required.

#### Password Reset

Using the user's provided email address and a tool such as EmailJS, an automated system could be implemented to allow the user to recover an otherwise lost account.

#### Advanced Exercise Filtering

At present the only filtering is between the user's own and others' exercises, this is the extent of what is required for the purpose of an exercise "check-list" but could be extended if project purpose required further expansion.

#### Batch Updating of Records

Methods are available in PyMongo to mass-update records, this capability was identified in the early stages of project development. Although this is a poweful capability, it does not fit use-cases for this project.  

#### Profanity Filter  

At present each user is given freedom to use whatever username they want, if the project were to be used in a commercial environment rather than solely educational it would be necessary to implement a profanity filter. Inputs could be compared against a list of "banned words" to help to prevent griefing.  

## Technologies Used

- HTML, CSS and Javascript are used for creating the frontend structure blocks, styling and logic of this site.
- [jQuery](https://jquery.com/) is primarily used within this project for ease of DOM manipulation.
- [Bootstrap](https://getbootstrap.com) is used for resolution responsiveness and for general structuring of the UI.
- [Python](https://www.python.org/) is used for backend manipulation.
- [Flask](https://www.fullstackpython.com/flask.html) is a Python-based framework used for the implementation of templates for components and page structures within this project.
- [MongoDB](https://www.mongodb.com/) was used to store the no-SQL database.
- [PyMongo](https://api.mongodb.com/python/current/) was used to manage/interact with the MongoDB database.
- [Git](https://git-scm.com/) is used for the version control of this project.
- [Font Awesome](https://fontawesome.com/) provides the icon in the header and all icons used in buttons, e.g. complete, clone, edit, delete.
- [Google Fonts](https://fonts.google.com/) is used to supply the main font for the majority of this website, the font sourced through this service is named Bebas Neue.
- [Heroku](https://dashboard.heroku.com/) is used for the live deployment of the site.

## Testing

Testing documentation is located in the [TESTING.md file.](./TESTING.md)

## Database Structure

Two collections were used in this project: "users" and "exercises"

### Users Collection

The structure of a document within this collection is as follows:  
| Title | db Key | Data type |
--- | --- | ---
User ID | _id | ObjectId
Username | username | String
Email Address | email | String
Hashed Password | password | String
Followed User | following | Array

### Exercises Collection

The structure of a document within this collection is as follows:
| Title | db Key | Data type |
--- | --- | ---
Exercise ID | _id | ObjectId
Exercise Name | exercisename | String
Primary Target Muscle | targetmuscle | String
Equipment Name | equipmentname | String
Weight/Distance | weightdistancevalue | String  
Exercise Owner | owner | String  
Completion Status | complete | Boolean  

## Deployment

This project was developed using Visual Studio Code, and was both committed to git and pushed to GitHub using the integrated source control feature.

### Local Deployment

#### Pre-Requisites

Basic requirements for local deployment are as follows.

- [Python3](https://www.python.org/downloads/)
- [Git](https://git-scm.com/downloads)
- IDE, e.g. [VSCode](https://code.visualstudio.com/)
- [PIP](https://pip.pypa.io/en/stable/installing/)
- An account for [MongoDB](https://www.mongodb.com/cloud/atlas) is required for database creation and access.

### Deployment Steps

1. Following from installation of pre-requisites, open the target directory and clone the repository with the following command in the terminal:

```console
git clone https://github.com/ElliotRedhead/WorkoutPlanner
```

2. The standard recommendation for managing python packages and preventing package conflicts is to create an isolated virtual environment for each project. Using python's included venv package create an environment within the target directory (command varies based on OS, check the [documentation](https://docs.python.org/3/library/venv.html) for additional help with this.):

```console
Windows: python -m venv venv
Linux: py3 -m venv venv
```

3. Activate the newly-created virtual environment (command varies based on OS):

```console
Windows: venv/Scripts/activate
Linux: source venv/Scripts/activate
```

4. Add the required python modules using pip (command varies based on OS):

```console
Windows: pip install -r requirements.txt
Linux: pip3 install -r requirements.txt
```

5. Inside the target directory create a new file, and name it: "env.py".

6. Copy the following code block into the env.py file, populating with the properties of your database.

```console
import os

os.environ["MONGO_URI"] = "INSERTYOURMONGOLINKHERE"
os.environ["MONGO_DB"] = "INSERTYOURDATABASENAMEHERE"
os.environ["SECRET_KEY"] = "INSERTYOURSECRETKEYHERE"
```

The collections used within this project are named "users" and "exercises", these will be created upon registering the first user and the user creates their first exercise.

7. Run the application using the following in the command line.

```console
Windows: python app.py
Linux: python3 app.py
```

8. The running terminal will direct you to the running address to access the application.

### Deployment to Heroku

The Procfile and requirements.txt pre-requisites are already included within the Workout Planner repository.  
Steps to deploy Workout Planner to Heroku are as follows:

1. Access the [Heroku website](https://dashboard.heroku.com/apps) and create a new app by selecting the "New" button in the dashboard.  
Name the application and set the region as "Europe".

2. Navigate to the new application's dashboard page and select "Deploy": "Deployment Method", set this to "Github".

3. Confirm connection of the app to the require Github repository.

4. To set required configuration variables: select "Settings": "Reveal Config Vars".

5. Set the required variables as detailed:  
Key: Value  
IP: 0.0.0.0  
PORT: 5000  
MONGO_URI: `mongodb+srv://<username>:<password>@<cluster_name>-qtxun.mongodb.net/<database_name>?retryWrites=true&w=majority`  
SECRET_KEY: `<examplesecretkey>`  

The MONGO_URI value is provided by MongoDB, the [documentation](https://docs.atlas.mongodb.com/) provides help for this.

6. In the app settings, access the "Deploy" tab and manually deploy the app: with the master branch selected, click "Deploy Branch".

7. Wait for the app to fully deploy, access the running app via the "Open app" button at the top of the page.

## Credits

### Additional Resources

The main font applied to this site is: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue).  
The images used in this site were obtained from the following sources:

- [Geometric architecture image by Scott Webb, sourced from Pexels](https://www.pexels.com/photo/abstract-architecture-building-exterior-geometric-593158/) is used for the main background of the site.
- [Grayscale barbell image by Victor Freitas, sourced from Pexels](https://www.pexels.com/photo/grayscale-photo-of-black-adjustable-dumbbell-949131/) is used for the welcome page background.

### Acknowledgements

Thank you to Stack Overflow user [aldel](https://stackoverflow.com/users/2501624/aldel) for his [solution](https://stackoverflow.com/a/37842465) to my redirect "http/https" bug, and saving me from further hours of head-scratching.  

Many thanks for support in the creation of this website to my mentor: [Simen Daehlin](https://github.com/Eventyret).

#### Disclaimer

This project and its contents are for educational purposes only.
