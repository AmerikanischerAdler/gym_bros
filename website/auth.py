from flask import Blueprint, render_template

auth = Blueprint("auth", __name__)

@auth.route('/sign')
def sign():
    return render_template('sign.html')

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/sign-up')
def sign_up():
    return render_template('sign_up.html')

@auth.route('/logout')
def logout():
    return render_template('logout.html')


