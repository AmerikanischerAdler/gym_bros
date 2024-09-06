from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, send_file, abort
from flask_login import login_required, current_user
from datetime import datetime
from .models import db, User, Post, Comment, Like
import pytz
import io

pages = Blueprint("pages", __name__)

i_usernames = ["bro", "thatguy", "username", "andy", "Smithy", "WiseGuy"]

@pages.route('/')
@pages.route('/home')
def home():
    posts = Post.query.all()
    return render_template('index.html', user=current_user, posts=posts, i_usernames=i_usernames)

@pages.route('/search')
def search():
    query = request.args.get('query')

    posts = Post.query.filter(Post.title.ilike(f'%{query}%') | Post.text.like(f'%{query}%')).all()
    users = User.query.filter(User.username.ilike(f'%{query}%')).all()

    return render_template('search_results.html', query=query, posts=posts, users=users, user=current_user)

@pages.route('/gallery')
def gallery():
    return render_template('gallery.html', user=current_user, i_usernames=i_usernames)

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
    liked_posts = Post.query.join(Like, Post.id == Like.post_id).filter(Like.author == current_user.user_id).all()

    return render_template('saved.html', user=current_user, liked_posts=liked_posts, i_usernames=i_usernames)

@pages.route('/not-saved')
def not_saved():
    return render_template('not_saved.html', user=current_user, i_usernames=i_usernames)

@pages.route('/post_image/<int:post_id>')
def post_image(post_id):
    post = Post.query.get(post_id)
    if post and post.image and post.image_mime_type:
        return send_file(
            io.BytesIO(post.image),
            mimetype=post.image_mime_type,
            as_attachment=False,
            download_name=f'post_{post_id}.jpeg'
        )
    else:
        abort(404)

@pages.route('/post-template', methods=["GET", "POST"])
@login_required
def post():
    if request.method == "POST":
        text = request.form.get("text")
        title = request.form.get("title")
        image = request.files.get("image")

        if not text:
            flash("Post Cannot be Empty", "error")

        elif not title:
            flash("Title Cannot be Empty", "error")

        else: 
            if not image:
                #flash("Must Include Image", "error")
                image_data = None
                image_mime_type = None

            else:
                image_data = image.read()
                image_mime_type = image.mimetype

            post = Post(text=text, author=current_user.user_id, title=title, image=image_data, image_mime_type=image_mime_type)
            db.session.add(post)
            db.session.commit()

            flash("Post Created!", "success")
            return redirect(url_for("pages.home"))

    return render_template('create_post.html', user=current_user)

@pages.route('/delete-post/<id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.filter_by(id=id).first()

    if not post:
        return {"error": "Post Does Not Exist"}, 404
    elif current_user.user_id != post.user.user_id:
        return {"error": "You Must Be Author to Delete This Post"}, 403
    else:
        db.session.delete(post)
        db.session.commit()
        return {"message": "Post Deleted", "post_id": id}, 200

@pages.route('/comment/<post_id>', methods=["POST"])
@login_required
def comment(post_id):
    text = request.form.get("text")

    if not text:
        return jsonify({"error": "Comment Cannot be Empty"}), 400

    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"error": "Post Does Not Exist"}), 404

    comment = Comment(text=text, author=current_user.user_id, post_id=post_id)
    db.session.add(comment)
    db.session.commit()

    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.date_created.desc()).all()

    response = {
        'comment': {
            'id': comment.id,
            'text': comment.text,
            'author': comment.user.username,
            'date_created': comment.date_created.strftime('%Y-%m-%d %H:%M:%S')
        },
        'comments_count': len(comment.post.comments)  
    }
    return jsonify(response)

@pages.route('/delete-comment/<comment_id>', methods=["POST"])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()

    if not comment:
        return jsonify({"error": "Comment Does Not Exist"}), 400

    if current_user.user_id != comment.author and current_user.user_id != comment.post.author:
        return jsonify({"error": "You Must be Author to Delete Comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    post = Post.query.filter_by(id=comment.post_id).first()

    return jsonify({
        "comments_count": len(post.comments),
        "comment_id": comment_id
    }), 200

@pages.route('/like-post/<post_id>', methods=["POST"])
@login_required
def like(post_id):
    post = Post.query.filter_by(id=post_id).first()
    like = Like.query.filter_by(author=current_user.user_id, post_id=post_id).first()

    if not post:
        return jsonify({"error": "Post Does Not Exist"}, 400)
    elif like:
        db.session.delete(like)
        db.session.commit()
    else:
        like = Like(author=current_user.user_id, post_id=post_id)
        db.session.add(like)
        db.session.commit()
 
    return jsonify({"likes": len(post.likes), "liked": current_user.user_id in map(lambda x: x.author, post.likes)})

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

