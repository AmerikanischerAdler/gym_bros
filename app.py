#!/opt/homebrew/bin/python3.11

import requests
from flask import Flask, render_template, request, redirect, session, url_for

app = Flask(__name__)

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/sign')
def sign():
    return render_template('sign.html')

@app.route('/saved')
def saved():
    return render_template('saved.html')

if __name__ == '__main__':
    app.run(debug=True)

