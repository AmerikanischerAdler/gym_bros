from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user

pages = Blueprint("pages", __name__)

@pages.route('/')
@pages.route('/home')
def home():
    return render_template('index.html')

@pages.route('/gallery')
def gallery():
    return render_template('gallery.html')

@pages.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

@pages.route('/saved')
@login_required
def saved():
    return render_template('saved.html')

@pages.route('/not-saved')
def not_saved():
    return render_template('not_saved.html')
 
@pages.route('/settings')
@login_required
def settings():
    return render_template('settings.html')
 
@pages.route('/not-settings')
def not_settings():
    return render_template('not_settings.html')
 
