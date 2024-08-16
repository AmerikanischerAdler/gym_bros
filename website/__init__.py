from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "brother"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)

    from .pages import pages
    from .auth import auth

    app.register_blueprint(pages, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
   
#   create_db(app)

    return app

def create_db(app):
    if not path.exists("website/" + DB_NAME):
        db.create_all(app=app)
        print("Database Created.")

