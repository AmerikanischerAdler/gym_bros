from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from . import db  

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["GET", "POST"])
def login():
    message = ''

    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")

        # Login
        query_stmt = "SELECT user_id, username FROM users WHERE email=:email AND password=:password;"
        if name is None:
            with db.engine.begin() as conn:
                result = conn.execute(text(query_stmt), {'email': email, 'password': password})
                user = result.fetchone()
            
            if user:
                message = f"Welcome, {username}!"
                #login_user(user[1], remember=True)
                return redirect(url_for('pages.home', user_id=user[0])) 
            else:
                message = "Incorrect Username or Password."

        # Create Account
        elif name and username:
            check_query = "SELECT username FROM users WHERE username=:username;"
            with db.engine.begin() as conn:
                user_exists = conn.execute(text(check_query), {'username': username}).fetchone()

            check_query2 = "SELECT email FROM users WHERE email=:email;"
            with db.engine.begin() as conn:
                user_also_exists = conn.execute(text(check_query2), {'email': email}).fetchone()

            if user_exists or user_also_exists:
                message = "User already exists!"
            else:
                insert_query = "INSERT INTO users (name, email, username, password) VALUES (:name, :email, :username, :password);"
                with db.engine.begin() as conn:
                    conn.execute(text(insert_query), {'name': name, 'email': email, 'username': username, 'password': password})

                with db.engine.begin() as conn:
                    result = conn.execute(text(query_stmt), {'email': email, 'password': password})
                user = result.fetchone()

                message = "Registration successful!"
                #login_user(user[1], remember=True)
                return redirect(url_for('pages.home', user_id=user[0])) 

    return render_template('login.html', message=message)

@auth.route('/logout')
@login_required
def logout():
    logout_user(user)
    return redirect(url_for("pages.home"))

