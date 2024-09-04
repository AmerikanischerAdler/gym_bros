import os
from flask import Flask, render_template, request, redirect, session, url_for, flash
from flask_login import LoginManager, current_user
from .models import db, User, Post, Comment, Like

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]
    app.config['MYSQL_HOST'] = "localhost"
    app.config['MYSQL_USER'] = "root"
    app.config['MYSQL_PASSWORD'] = os.environ["MYSQLPW"]
    app.config['MYSQL_DB'] = "GymBros"
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD']}@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}"
    # This is to connect a remote db (for production)
    # Delete all above config except SECRET_KEY
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')  
    # ^ Replace with your remote database URI ^
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .pages import pages
    from .auth import auth

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader 
    def load_user(user_id):
        return User.query.get(int(user_id))

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html", user=current_user), 404

    @app.errorhandler(403)
    def page_not_found(e):
        return render_template("403.html", user=current_user), 403

    app.register_blueprint(pages, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")  

    return app

