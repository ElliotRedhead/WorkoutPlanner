import os
from flask import Flask, redirect, render_template, request, url_for
from flask_pymongo import PyMongo


if path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")  
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")