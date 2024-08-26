import os
from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 
#from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()  

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "brother"
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = os.environ["MYSQLPW"]
    app.config['MYSQL_DB'] = 'GymBros'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD']}@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .pages import pages
    from .auth import auth

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader 
    def load_user(id):
        return db.query.get(int(id))

    app.register_blueprint(pages, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")  

    return app

