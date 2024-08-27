from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()

        # Login
        if name is None:
            if user and check_password_hash(user.password, password):
                login_user(user, remember=True)
                flash("Logged in Successfully!", "success")
                return redirect(url_for("pages.home")) 
            else:
                flash("Incorrect Email or Password.", "error")

        # Create Account
        elif name and username:
            user_exists = User.query.filter_by(email=email).first()
            user_also_exists = User.query.filter_by(username=username).first()

            if user_exists or user_also_exists:
                flash("User Already Exists!", "error")
            else:
                hashed_password = generate_password_hash(password, method='scrypt')
                new_user = User(email=email, password=hashed_password, username=username, name=name)
                db.session.add(new_user)
                db.session.commit()

                flash("Registration Successful!", "success")
                login_user(new_user, remember=True)
                return redirect(url_for("pages.home")) 

    return render_template("login.html")

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("pages.home"))

