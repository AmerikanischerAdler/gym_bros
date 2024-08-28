from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user

pages = Blueprint("pages", __name__)

@pages.route('/')
@pages.route('/home')
def home():
    return render_template('index.html', user=current_user)

@pages.route('/gallery')
def gallery():
    return render_template('gallery.html', user=current_user)

@pages.route('/profile')
@login_required
def profile():
    return render_template('profile.html', user=current_user)

@pages.route('/saved')
@login_required
def saved():
    return render_template('saved.html', user=current_user)

@pages.route('/not-saved')
def not_saved():
    return render_template('not_saved.html', user=current_user)

@pages.route('/post-template', methods=["GET", "POST"])
@login_required
def post():
    if request.method == "POST":
        text = request.form.get("text")

        if not text:
            flash("Post Cannot be Empty", "error")
        else:
            flash("Post Created!", "success")
            # link db

    return render_template('create_post.html', user=current_user)
 
@pages.route('/settings')
@login_required
def settings():
    return render_template('settings.html', user=current_user)
 
@pages.route('/not-settings')
def not_settings():
    return render_template('not_settings.html', user=current_user)
 
