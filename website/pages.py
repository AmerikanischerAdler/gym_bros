from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, send_file, abort, session
from flask_login import login_required, current_user
from datetime import datetime
from .models import db, User, Post, Comment, Like, Follow
import pytz
import io

pages = Blueprint("pages", __name__)

i_usernames = ["bro", "thatguy", "username", "andy", "Smithy", "WiseGuy"]


# Base
@pages.route('/')
@pages.route('/home')
def home():
    posts = Post.query.all()
    if current_user.is_authenticated:
        return render_template('index.html', user=current_user, posts=posts, i_usernames=i_usernames)
    else:
        return render_template('welcome.html', user=current_user, i_usernames=i_usernames)

@pages.route('/search')
def search():
    query = request.args.get('query')

    posts = Post.query.filter(Post.title.ilike(f'%{query}%') | Post.text.like(f'%{query}%')).all()
    users = User.query.filter(User.username.ilike(f'%{query}%')).all()

    return render_template('search_results.html', query=query, posts=posts, users=users, user=current_user)


# Leaderboards & Leagues
@pages.route('/leagues')
@login_required
def leagues():
    users = User.query.all()
    return render_template('leagues.html', user=current_user, users=users)


# Gallery
@pages.route('/gallery')
def gallery():
    # Just for Test
    pictures = ["man5.jpg", "man2.jpg", "man3.jpg", "girl4.jpg", "girl8.jpg",
                "girl3.jpg", "man25.jpg", "girl.jpeg", "man24.jpg", "man4.jpg",
                "man7.jpg", "man6.jpg", "man1.jpg", "man8.jpg", "man17.jpg",
                "man9.jpg", "man11.jpg", "man15.jpg", "man16.jpg", "man13.jpg",
                "man18.jpg", "man22.jpg", "girl1.jpeg", "man12.jpg",
                "man20.jpg", "man21.jpg", "man19.jpg", "girl7.jpg", "man26.jpg",
                "girl5.jpg", "bro3.avif", "bro2.avif", "bro1.avif", "bro5.jpeg",
                "nerd.jpeg", "bro4.jpeg"]
    badges = ["natty", "influencer", "five", "bom", "new"]

    return render_template('gallery.html', user=current_user, i_usernames=i_usernames, badges=badges, pictures=pictures)


# Profile
@pages.route('/profile/<username>')
@login_required
def profile(username):
    if username == current_user.username:
        user = current_user

    else:
        user = User.query.filter_by(username=username).first()

        if not user:
            flash("Username Does Not Exist", "error")
            return redirect(url_for("pages.home"))

        #To add posts to Profile page
        #posts = user.posts

    # Just for Test
    pictures = ["man5.jpg", "man2.jpg", "man3.jpg", "girl4.jpg", "girl8.jpg",
                "girl3.jpg", "man25.jpg", "girl.jpeg", "man24.jpg", "man4.jpg",
                "man7.jpg", "man6.jpg", "man1.jpg", "man8.jpg", "man17.jpg",
                "bro3.avif", "bro2.avif", "bro1.avif", "bro5.jpeg",
                "nerd.jpeg", "bro4.jpeg"]

    ppictures = ["man5.jpg", "man2.jpg", "man3.jpg", "girl4.jpg", "girl8.jpg",
                "girl3.jpg", "man25.jpg", "girl.jpeg", "man24.jpg"]

    badges = ["natty", "influencer", "five", "bom", "new"]

    return render_template('profile.html', user=user, badges=badges, pictures=pictures, ppictures=ppictures)#, posts=posts)

@pages.route("/toggle_editing", methods=["POST"])
def toggle_editing():
    user = current_user

    session['editing'] = not session.get('editing', False)
    editing = session['editing']

    # Just for Test
    pictures = ["man5.jpg", "man2.jpg", "man3.jpg", "girl4.jpg", "girl8.jpg",
                "girl3.jpg", "man25.jpg", "girl.jpeg", "man24.jpg", "man4.jpg",
                "man7.jpg", "man6.jpg", "man1.jpg", "man8.jpg", "man17.jpg",
                "bro3.avif", "bro2.avif", "bro1.avif", "bro5.jpeg",
                "nerd.jpeg", "bro4.jpeg"]

    ppictures = ["man5.jpg", "man2.jpg", "man3.jpg", "girl4.jpg", "girl8.jpg",
                "girl3.jpg", "man25.jpg", "girl.jpeg", "man24.jpg"]

    badges = ["natty", "influencer", "five", "bom", "new"]

    return render_template('profile_form.html', user=user, badges=badges, pictures=pictures, ppictures=ppictures, editing=editing)#, posts=posts)

@pages.route('/update-profile', methods=["POST"])
@login_required
def update_profile():
    user = current_user
    
    if request.form.get("motto"):
        user.life_motto = request.form.get('motto')
    if request.form.get("bio"):
        user.bio = request.form.get('bio')

    #Birthday
    if request.form.get("birthday-month"):
        birthday_month = request.form.get('birthday-month')
    else:
        birthday_month = None
    if request.form.get("birthday-day"):
        birthday_day = request.form.get('birthday-day')
    else:
        birthday_day = None
    if request.form.get("birthday-year"):
        birthday_year = request.form.get('birthday-year')
    else:
        birthday_year = None

    if birthday_month and birthday_day and birthday_year:
        user.birthday = f"{birthday_year}-{birthday_month}-{birthday_day}"

    # Gender & Health
    if request.form.get("gender"):
        user.gender = request.form.get('gender')
    if request.form.get("natty"):
        user.natty_status = request.form.get('natty')

    # Current Stats
    if request.form.get("bench-now"):
        user.bench_now = request.form.get('bench-now')
    if request.form.get("squat-now"):
        user.squat_now = request.form.get('squat-now')
    if request.form.get("clean-now"):
        user.clean_now = request.form.get('clean-now')
    if request.form.get("deadlift-now"):
        user.deadlift_now = request.form.get('deadlift-now')

    # Future Goals
    if request.form.get("bench-future"):
        user.bench_future = request.form.get('bench-future')
    if request.form.get("squat-future"):
        user.squat_future = request.form.get('squat-future')
    if request.form.get("clean-future"):
        user.clean_future = request.form.get('clean-future')
    if request.form.get("deadlift-future"):
        user.deadlift_future = request.form.get('deadlift-future')

    try:
        db.session.commit()
        flash("Profile updated successfully!", "success")
    except Exception as e:
        db.session.rollback()
        flash(f"An error occurred: {e}", "error")

    return redirect(url_for('pages.profile', username=user.username))

@pages.route('/follow/<int:user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    user_to_follow = User.query.get_or_404(user_id)
    already_followed = Follow.query.filter_by(follower_id=current_user.user_id, followed_id=user_id).first()

    if not user_to_follow:
        return jsonify({"error": "User not found"}), 404

    if user_to_follow == current_user:
        return jsonify({'error': 'You cannot follow yourself.'}), 400

    if already_followed:
        current_user.unfollow(user_to_follow)
        message = f"You are no longer following {user_to_follow.username}"
        is_following = False

    else:
        current_user.follow(user_to_follow)
        message = f"You are now following {user_to_follow.username}"
        is_following = True
    
    db.session.commit()

    followers_count = Follow.query.filter_by(followed_id=user_id).count()
    friends = user_to_follow.mutual_followers_count()

    return jsonify({
        'message': message,
        'followers_count': followers_count,
        'friends_count': friends,
        'isFollowing': is_following,
    }), 200


# Posts
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


# Saved Posts
@pages.route('/saved')
@login_required
def saved():
    liked_posts = Post.query.join(Like, Post.id == Like.post_id).filter(Like.author == current_user.user_id).all()

    return render_template('saved.html', user=current_user, liked_posts=liked_posts, i_usernames=i_usernames)

@pages.route('/not-saved')
def not_saved():
    return render_template('not_saved.html', user=current_user, i_usernames=i_usernames)


# Settings
@pages.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    if request.method == "POST":
        # Feed Filter
        if request.form.get("feed-filter"):
            current_user.feed_filter = request.form.get("feed-filter")
            db.session.commit()
            flash("Settings updated successfully!", "success")

        # Timezone
        if current_user.timezone != request.form.get("user_timezone_str") and request.form.get("user_timezone_str") != None:
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


# Gym Tools
@pages.route('/tools')
def tools():
    return render_template('tools.html', user=current_user)

@pages.route('/plate_calc')
def plate_calc():
    return render_template('plate_calc.html', user=current_user)

@pages.route('/one_rm_calc')
def one_rm_calc():
    return render_template('one_rm_calc.html', user=current_user)

@pages.route('/weight_conv')
def weight_conv():
    return render_template('weight_conv.html', user=current_user)


# Gym Books
@pages.route('/library')
def library():
    return render_template('library.html', user=current_user)

@pages.route('/gym_dict')
def gym_dict():
    return render_template('gym_dict.html', user=current_user)

@pages.route('/rulebook')
def rulebook():
    return render_template('rulebook.html', user=current_user)


# Gym Politics
@pages.route('/politics')
def politics():
    return render_template('politics.html', user=current_user)

@pages.route('/poll')
def poll():
    return render_template('poll.html', user=current_user)

@pages.route('/motivation')
def motivation():
    return render_template('motivation.html')

