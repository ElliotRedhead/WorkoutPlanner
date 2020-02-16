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
# UPDATE WITH RELEASE-STAGE COLOURS, COMMENT ON HOW THESE HAVE CHANGED WITH DEVELOPMENT & RESEARCH.
The initial website design concepts have been formed with the following colour palette:  
![#0f1011](https://placehold.it/15/0f1011/000000?text=+) `#0f1011`  
![#615F5B](https://placehold.it/15/615F5B/000000?text=+) `#615F5B`  
![#A2A29F](https://placehold.it/15/A2A29F/000000?text=+) `#A2A29F`  
![#FBFBFB](https://placehold.it/15/FBFBFB/000000?text=+) `#FBFBFB`  
![#2B5630](https://placehold.it/15/2B5630/000000?text=+) `#2B5630`  
![#04A647](https://placehold.it/15/04A647/000000?text=+) `#04A647`

The chosen palette defines the site as a predominantly dark-themed design with lighter colours used to highlight / segment components.

## Wireframes
# UPDATE WITH RELEASE-STAGE WIREFRAMES, COMMENT ON THE DIFFERENCES AND WHY.
<details>
<summary> Project Inception Wireframes </summary>

Basic wireframes have been created upon project inception to aid in the planning stages of this project, these are to be adapted as the project proceeds with further iterations for multiple breakpoints.

### Mobile Wireframe

![Mobile Inception Wireframe](./static/wireframes/Mobile-List.png)

### Desktop Wireframe

![Desktop Inception Wireframe](./static/wireframes/Desktop-WeeklyList.png)
</details>

## Features

### Existing Features

#### Authentication

Access to the website is restricted to registered users. Upon loading: users are presented with option to register a new account or login with an existing account. Once the user has submitted valid credentials their login state is persisted across the session and the option to logout is available via a button in the navbar.

#### Management of Own Exercises

The site allows users to create, view, edit or delete their own exercises. Each exercise can be personalised to include details of the exercise name, target muscle, equipment used and a metric of intensity measured by either weight or distance. Upon completion the user can mark the exercise as completed.

#### Accessbility to Others' Exercises

Accessing the global page shows all users' exercise cards, the user then has the option to clone those exercises to their own list if they want to.

### Potential Features to Implement

In its current state the project fulfils the initial requirements, demonstrating management of a database based on user input with a defined user case of forming an exercise to-do list and visibility of others' lists.
The following are suggested additions that would exceed the project time constraints or require inaccessible resources but that would provide additional value to the project if required.

#### Password Reset

Using the user's provided email address and a tool such as EmailJS, an automated system could be implemented to allow the user to recover an otherwise lost account.

#### Advanced Exercise Filtering

At present the only filtering is between the user's own and others' exercises, this is the extent of what is required for the purpose of an exercise "check-list" but could be extended if project purpose required further expansion.

#### Batch Updating of Records

Methods are available in PyMongo to mass-update records, this capability was identified in the early stages of project development. Although this is a poweful capability, it does not fit use-cases for this project.

## Technologies Used

- HTML, CSS and Javascript are used for creating the frontend structure blocks, styling and logic of this site.
- [jQuery](https://jquery.com/) is primarily used within this project for ease of DOM manipulation.
- [Bootstrap](https://getbootstrap.com) is used for resolution responsiveness and for general structuring of the UI.
- [Flask](https://www.fullstackpython.com/flask.html) is a Python-based framework used for the implementation of templates for components and page structures within this project.
- [MongoDB](https://www.mongodb.com/) was used to store the no-SQL database.
- [PyMongo](https://api.mongodb.com/python/current/) was used to manage/interact with the MongoDB database.
- [Git](https://git-scm.com/) is used for the version control of this project.
- [Font Awesome](https://fontawesome.com/) provides the icon in the header and all icons used in buttons, e.g. complete, clone, edit, delete.
- [Google Fonts](https://fonts.google.com/) is used to supply the main font for the majority of this website, the font sourced through this service is named Bebas Neue.

### Testing

Testing documentation is located in the [testing.md file.](./TESTING.md)

### Known Bugs & Limitations

Are there any features that don't perform as expected, is the discovery documented through testing section, are potential solutions noted?

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

2. The standard recommendation for managing python packages and preventing package conflicts is to create an isolated virtual environment for each project. Using python's included venv package create an environment within the target directory (command varies based on OS):

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

## Deployment to Heroku

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

The main font applied to this site is: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)
The images used in this site were obtained from the following sources:

- [Geometric architecture image by Scott Webb, sourced from Pexels](https://www.pexels.com/photo/abstract-architecture-building-exterior-geometric-593158/)

### Acknowledgements

#### Disclaimer

This project and its contents are for educational purposes only.
