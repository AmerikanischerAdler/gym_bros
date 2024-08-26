import requests
import os
from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy import text

MY_PW = os.environ["MYSQLPW"]

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{MY_PW}@localhost/GymBros'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)

    from .pages import pages
#    from .auth import auth

#    auth = Blueprint("auth", __name__)
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        message = ''
    
        if request.method == 'POST':
            name = request.form.get("name")
            email = request.form.get("email")
            username = request.form.get("username")
            password = request.form.get("password")
    
            # Login
            if name == None:
                query_stmt = f"SELECT user_id, username FROM users WHERE email=:email AND password=:password;"
        
                with db.engine.begin() as conn:
                    result = conn.execute(text(query_stmt), {'email': email, 'password': password})
                    conn.commit()
                user = result.fetchone()
        
                if user:
                    message = f"Welcome, {username}!"
                    return redirect(url_for('pages.home', user_id=user[0])) 
                else:
                    message = "Incorrect Username or Password."
    
            # Create Account
            elif name != None and username != None:
                check_query = "SELECT username FROM users WHERE username=:username;"
                with db.engine.begin() as conn:
                    user_exists = conn.execute(text(check_query), {'username': username}).fetchone()
                    conn.commit()
    
                if user_exists:
                    message = "User already exists!"
                else:
                    insert_query = "INSERT INTO users (name, email, username, password) VALUES (:name, :email, :username, :password);"
                    with db.engine.begin() as conn:
                        conn.execute(text(insert_query), {'name': name, 'email': email, 'username': username, 'password': password})
                        conn.commit()
    
                    message = "Registration successful!"
    
        return render_template('login.html', message=message)

    @app.route('/logout')
    def logout():
        return redirect(url_for("pages.home"))

    app.register_blueprint(pages, url_prefix="/")
#    app.register_blueprint(auth, url_prefix="/")
   
    return app

