import os
from os import path
from flask import Flask, redirect, render_template, request, url_for
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

if path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")

client = PyMongo(app)


@app.route("/")
@app.route("/index")
def homepage():
    return render_template(
        "index.html",
        title = "Workout Planner | Home")

@app.route("/exercises")
def exercises():
    exercises = client.db.exercises.find()
    return render_template(
        "exercises.html",
        title="Workout Planner | Exercises",
        exercises = exercises)

@app.route("/login")
def login():
    return render_template(
        "login.html",
        title="Workout Planner | Login")


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=os.getenv('PORT'), debug=True)
