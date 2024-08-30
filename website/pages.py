from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user
from datetime import datetime
from .models import db, User, Post, Comment
import pytz

pages = Blueprint("pages", __name__)

@pages.route('/')
@pages.route('/home')
def home():
    posts = Post.query.all()
    return render_template('index.html', user=current_user, posts=posts)

@pages.route('/gallery')
def gallery():
    return render_template('gallery.html', user=current_user)

@pages.route('/profile/<username>')
@login_required
def profile(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        flash("Username Does Not Exist", "error")
        return redirect(url_for("pages.home"))

    # To add posts to Profile page
    #post = user.posts

    return render_template('profile.html', user=current_user, username=username)#, posts=posts)

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
        # title = request.form.get("title")
        # img = request.form.get("img")

        if not text:
            flash("Post Cannot be Empty", "error")
#        elif not title:
#            flash("Title Cannot be Empty", "error")
#        elif not img:
#            flash("Image Cannot be Empty", "error")
        else:
            post = Post(text=text, author=current_user.user_id)#, title=title, img=img)
            db.session.add(post)
            db.session.commit()
            flash("Post Created!", "success")
            return redirect(url_for("pages.home"))

    return render_template('create_post.html', user=current_user)

@pages.route('/delete-post/<id>')
def delete_post(id):
    post = Post.query.filter_by(id=id).first()

    if not post:
        flash("Post Does Not Exist", "error")
    elif current_user.user_id != post.user.user_id:
        flash("You Must be Author to Delete Post", "error")
    else:
        db.session.delete(post)
        db.session.commit()
        flash("Post Deleted", "success")

    return redirect(url_for("pages.home"))

@pages.route('/comment/<post_id>', methods=["POST"])
@login_required
def comment(post_id):
    text = request.form.get("text")

    if not text:
        flash("Comment Cannot be Empty", "error")
    else:
        post = Post.query.filter_by(id = post_id)

        if not post:
            flash("Post Does Not Exist", "error")
        else:
            comment = Comment(text=text, author=current_user.user_id, post_id=post_id)
            db.session.add(comment)
            db.session.commit()

    return redirect(url_for("pages.home"))
 
@pages.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    if request.method == "POST":
        # Timezone
        user_timezone_str = request.form.get("user_timezone_str")
        current_user.timezone = user_timezone_str
        db.session.commit()
        utc_time = datetime.utcnow()
        local_time = current_user.convert_to_localtime(utc_time)
        flash(f"Local Time Set to {user_timezone_str}: {local_time}", "success")
        return redirect(url_for('pages.settings'))

    all_timezones = pytz.all_timezones
    return render_template('settings.html', user=current_user, user_timezone=current_user.timezone, all_timezones=all_timezones)
 
@pages.route('/not-settings')
def not_settings():
    return render_template('not_settings.html', user=current_user)
 
