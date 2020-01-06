import os, json
from flask import Flask, redirect, render_template, request, url_for, session, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from bson.json_util import dumps

if os.path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

client = PyMongo(app)

@app.route("/")
@app.route("/index")
def homepage():
    return render_template(
        "index.html",
        title = "Workout Planner | Home")

@app.route("/myexercises")
def exercises(owner):
    exercises = client.db.exercises.aggregate([{"$match": {"owner": owner}}])
    return render_template(
        "myexercises.html",
        title="Workout Planner | My Exercises",
        exercises = exercises)

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        logged_user = client.db.users.find_one({"username": request.form["inputUsername"]})
        if logged_user:
            # client.db.users.update_one({"username":request.form["inputUsername"]},{ "$set": {"password":generate_password_hash(request.form["inputPassword"])}})
            if check_password_hash((logged_user["password"]),(request.form["inputPassword"])):
                print("Login complete.")
                session["username"] = logged_user["username"]
                return redirect(url_for("homepage"))
            else:
                print("Invalid credentials provided.")
        else:
            print("Logged user not found.")
    return render_template(
        "login.html",
        title="Workout Planner | Login")

@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        request_data = request.get_json()
        print(request_data)
        existing_user = client.db.users.find_one({"username": request_data["inputUsername"]})
        if existing_user is None:
            client.db.users.insert_one({"username" : request_data["inputUsername"],"email" : request_data["inputEmail"], "password" : generate_password_hash(request_data["inputPassword"])})
            session["username"] = request_data["inputUsername"]
            response = { "newUser" : True }
        else:
            response = { "newUser" : False }
        return response
    return render_template(
        "register.html",
        title="Workout Planner | Register")

if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=os.getenv('PORT'), debug=True)
