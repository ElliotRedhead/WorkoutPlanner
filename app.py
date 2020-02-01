import os
import json
from flask import Flask, redirect, render_template, request, url_for, session
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

#https://stackoverflow.com/questions/14810795/flask-url-for-generating-http-url-instead-of-https


class ReverseProxied(object):
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        scheme = environ.get('HTTP_X_FORWARDED_PROTO')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)


if os.path.exists("env.py"):
    import env

APP = Flask(__name__)
APP.wsgi_app = ReverseProxied(APP.wsgi_app)
APP.config["MONGO_URI"] = os.environ.get("MONGO_URI")
APP.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
APP.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
APP.debug = True
CLIENT = PyMongo(APP)


def active_session_check(route_url):
    """Checks if user has an active session, if not redirects to login page.

    Keyword argument:
    route_url -- The URL that the user is accessing set by the route.
    """
    route_url = str(route_url)
    active_session = bool("user" in session)
    if active_session is False and (route_url != "/login" or "/register"):
        render_dict = dict({"page_render": render_template(
            "pages/login.html",
            title="Workout Planner | Login"),
            "redirect_action": True})
    else:
        render_dict = dict({"page_render": "", "redirect_action": False})
    return render_dict


@APP.route("/", methods=["POST", "GET"])
@APP.route("/myexercises")
def my_exercises():
    """Displays a logged in user's exercise list.

    Exercise documents where the value of the field equals the name of the user
    that is logged to the session are grouped for display.
    """
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercises = CLIENT.db.exercises.aggregate(
        [{"$match": {"owner": session["user"]}}])
    return render_template(
        "pages/exercises.html",
        title="Workout Planner | My Exercises",
        exercises=exercises)


@APP.route("/login", methods=["POST", "GET"])
def login():
    """Validates submitted credentials, if valid: user added to session else: returns fail response.

    Checks if the submitted username exists in the database, if not a suitable response is returned,
    if the username exists then the hashed password is compared with the existing database entry.
    If both the submitted username and password match the database records then user is added to
    session and user is redirected to their list of exercises.
    """
    active_session_check(request.url_rule)

    if request.method == "POST":
        request_data = request.get_json()
        print(request_data)
        response = {}
        logged_username = CLIENT.db.users.find_one(
            {"username": request_data["inputUsername"]}
        )
        if logged_username is None:
            response["existingUsername"] = False
            return json.dumps(response)
        response["existingUsername"] = True
        if check_password_hash(
                (logged_username["password"]),
                (request_data["inputPassword"])):
            session["user"] = request_data["inputUsername"]
            response["validPassord"] = True
            response["url"] = (url_for("my_exercises"))
            return json.dumps(response)
        response["validPassword"] = False
        return json.dumps(response)
    return render_template(
        "pages/login.html",
        title="Workout Planner | Login")


@APP.route("/register", methods=["POST", "GET"])
def register():
    active_session_check(request.url_rule)
    if request.method == "POST":
        request_data = request.get_json()
        response = {}
        existing_username = CLIENT.db.users.find_one(
            {"username": request_data["inputUsername"]})
        existing_email = CLIENT.db.users.find_one(
            {"email": request_data["inputEmail"]})
        response["newUsername"] = True if existing_username is None else False
        response["newEmail"] = True if existing_email is None else False
        if existing_username is None and existing_email is None:
            CLIENT.db.users.insert_one(
                {
                    "username": request_data["inputUsername"],
                    "email": request_data["inputEmail"],
                    "password": generate_password_hash(
                        request_data["inputPassword"])})
            session["user"] = request_data["inputUsername"]
            response["url"] = (url_for("my_exercises"))
        return json.dumps(response)
    return render_template(
        "pages/register.html",
        title="Workout Planner | Register")


@APP.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@APP.route("/globalexercises")
def global_exercises():
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercises = CLIENT.db.exercises.find()
    return render_template(
        "pages/exercises.html",
        title="Workout Planner | Global Exercises",
        exercises=exercises)


@APP.route("/createexercise", methods=["POST", "GET"])
def create_exercise():
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    if request.method == "POST":
        request_data = request.get_json()
        partial_record = {"owner": session["user"], "complete": False}
        request_data.update(partial_record)
        CLIENT.db.exercises.insert_one(request_data)
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Edit Exercise",
        form_heading="Create Exercise",
        form_name="createExerciseForm",
        exercise={"exercisename": "chest press", "targetmuscle": "chest",
                  "equipmentname": "barbell", "weightdistancevalue": "100kg"}
    )


@APP.route("/editexercise/<exercise_id>", methods=["POST", "GET"])
def edit_exercise(exercise_id):
    if (active_session_check(request.url_rule))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercise = CLIENT.db.exercises.find_one(
        {"_id": ObjectId(exercise_id)}
    )
    if request.method == "POST":
        request_data = request.get_json()
        CLIENT.db.exercises.update_one({"_id": ObjectId(
            exercise_id), "owner": session["user"]}, {"$set": request_data})
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Edit Exercise",
        form_heading="Edit Exercise",
        exercise=exercise,
        form_name="editExerciseForm",
    )


@APP.route("/completeexercise/<exercise_id>", methods=["POST", "GET"])
def complete_exercise(exercise_id):
    if (active_session_check(request.url_rule))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    query_filter = {"_id": ObjectId(exercise_id), "owner": session["user"]}
    exercise = (CLIENT.db.exercises.find_one(query_filter))
    toggle_value = False if exercise["complete"] == True else True
    CLIENT.db.exercises.update_one(
        query_filter, {"$set": {"complete": toggle_value}})
    return redirect(url_for("my_exercises", _external=True, _scheme="https"))


@APP.route("/deleteexercise/<exercise_id>")
def delete_exercise(exercise_id):
    CLIENT.db.exercises.find_one_and_delete({"_id": ObjectId(exercise_id)})
    return redirect(url_for("my_exercises", _external=True, _scheme="https"))


@APP.route("/cloneexercise/<exercise_id>", methods=["POST", "GET"])
def clone_exercise(exercise_id):
    full_record = CLIENT.db.exercises.find_one({"_id": ObjectId(exercise_id)})
    partial_record = {"owner": session["user"],
                      "_id": ObjectId(), "complete": False}
    if request.method == "POST":
        request_data = request.get_json()
        request_data.update(partial_record)
        CLIENT.db.exercises.insert_one(request_data)
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Clone Exercise",
        form_heading="Clone Exercise",
        exercise=full_record,
        form_name="editExerciseForm",
    )


if __name__ == '__main__':
    APP.run(host=os.getenv('IP'), port=os.getenv('PORT'), debug=True)
