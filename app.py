import os
import json
from flask import Flask, redirect, render_template, request, url_for, session
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_talisman import Talisman

if os.path.exists("env.py"):
    import env

app = Flask(__name__)
csp = {
    'default-src': ['\'unsafe-inline\'','\'self\'','*.bootstrapcdn.com','*.cloudflare.com','*.jsdelivr.net','*.jquery.com'],
    'style-src': ['\'unsafe-inline\'', '\'self\'','*.bootstrapcdn.com','*.cloudflare.com','*.jsdelivr.net','*.jquery.com'],
    'script-src': ['\'unsafe-inline\' \'self\'','*.bootstrapcdn.com','*.cloudflare.com','*.jsdelivr.net','*.jquery.com'],
    'connect-src': ['\'unsafe-inline\' \'self\'','*.herokuapp.com'],
    'img-src' : ['\'unsafe-inline\' \'self\'','*.w3.org']
}
Talisman(app, content_security_policy=csp, force_https=True)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["wsgi.url_scheme"] = "https"
client = PyMongo(app)

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


@app.route("/")
@app.route("/myexercises")
def my_exercises():
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercises = client.db.exercises.aggregate(
        [{"$match": {"owner": session["user"]}}])
    return render_template(
        "pages/exercises.html",
        title="Workout Planner | My Exercises",
        exercises=exercises)



@app.route("/login", methods=["POST", "GET"])
def login():
    active_session_check(request.url_rule)

    if request.method == "POST":
        request_data = request.get_json()
        response = {}
        logged_username = client.db.users.find_one(
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
            # return redirect(url_for("homepage", _external=True,_scheme='https'))
            return redirect(url_for("my_exercises"))
        response["validPassword"] = False
        return json.dumps(response)
    return render_template(
        "pages/login.html",
        title="Workout Planner | Login")


@app.route("/register", methods=["POST", "GET"])
def register():
    active_session_check(request.url_rule)
    if request.method == "POST":
        request_data = request.get_json()
        response = {}
        existing_username = client.db.users.find_one(
            {"username": request_data["inputUsername"]})
        existing_email = client.db.users.find_one(
            {"email": request_data["inputEmail"]})
        response["newUsername"] = True if existing_username is None else False
        response ["newEmail"] = True if existing_email is None else False
        if existing_username is None and existing_email is None:
            client.db.users.insert_one(
                {
                    "username": request_data["inputUsername"],
                    "email": request_data["inputEmail"],
                    "password": generate_password_hash(
                        request_data["inputPassword"])})
            session["user"] = request_data["inputUsername"]
            return redirect(url_for("my_exercises", _external=True, _scheme="https"))
        return json.dumps(response)
    return render_template(
        "pages/register.html",
        title="Workout Planner | Register")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/globalexercises")
def global_exercises():
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercises = client.db.exercises.find()
    return render_template(
        "pages/exercises.html",
        title="Workout Planner | Global Exercises",
        exercises=exercises)


@app.route("/createexercise", methods=["POST", "GET"])
def create_exercise():
    if ((active_session_check(request.url_rule)))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    if request.method == "POST":
        request_data = request.get_json()
        partial_record = {"owner": session["user"], "complete": False}
        request_data.update(partial_record)
        client.db.exercises.insert_one(request_data)
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Edit Exercise",
        form_heading="Create Exercise",
        form_name="createExerciseForm",
        exercise={"exercisename": "chest press", "targetmuscle": "chest",
                  "equipmentname": "barbell", "weightdistancevalue": "100kg"}
    )


@app.route("/editexercise/<exercise_id>", methods=["POST", "GET"])
def edit_exercise(exercise_id):
    if (active_session_check(request.url_rule))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    exercise = client.db.exercises.find_one(
        {"_id": ObjectId(exercise_id)}
    )
    if request.method == "POST":
        request_data = request.get_json()
        client.db.exercises.update_one({"_id": ObjectId(
            exercise_id), "owner": session["user"]}, {"$set": request_data})
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Edit Exercise",
        form_heading="Edit Exercise",
        exercise=exercise,
        form_name="editExerciseForm",
    )


@app.route("/completeexercise/<exercise_id>", methods=["POST", "GET"])
def complete_exercise(exercise_id):
    if (active_session_check(request.url_rule))["redirect_action"]:
        return active_session_check(request.url_rule)["page_render"]
    query_filter = {"_id": ObjectId(exercise_id), "owner": session["user"]}
    exercise = (client.db.exercises.find_one(query_filter))
    toggle_value = False if exercise["complete"] == True else True
    client.db.exercises.update_one(query_filter, {"$set": {"complete": toggle_value}})
    return redirect(url_for("my_exercises")
    )


@app.route("/deleteexercise/<exercise_id>")
def delete_exercise(exercise_id):
    client.db.exercises.find_one_and_delete({"_id": ObjectId(exercise_id)})
    return redirect(url_for("my_exercises")
    )

@app.route("/cloneexercise/<exercise_id>",methods=["POST", "GET"])
def clone_exercise(exercise_id):
    full_record = client.db.exercises.find_one({"_id": ObjectId(exercise_id)})
    partial_record = {"owner": session["user"], "_id": ObjectId(), "complete": False}
    if request.method == "POST":
        request_data = request.get_json()
        request_data.update(partial_record)
        client.db.exercises.insert_one(request_data)
    return render_template(
        "forms/exerciseform.html",
        title="Workout Planner | Clone Exercise",
        form_heading="Clone Exercise",
        exercise=full_record,
        form_name="editExerciseForm",
    )

if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=os.getenv('PORT'), debug=True)
