from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from pytz import timezone, utc
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'  

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    timezone = db.Column(db.String(50), nullable=False, default='UTC')
    feed_filter = db.Column(db.String(50), nullable=True)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())

    # Profile
    social_link = db.Column(db.String(250), nullable=True)
    life_motto = db.Column(db.String(250), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    birthday = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    relationship_status = db.Column(db.String(50), nullable=True)
    natty_status = db.Column(db.String(50), nullable=True)

    bench_now = db.Column(db.Integer, nullable=True)
    squat_now = db.Column(db.Integer, nullable=True)
    clean_now = db.Column(db.Integer, nullable=True)
    deadlift_now = db.Column(db.Integer, nullable=True)

    bench_future = db.Column(db.Integer, nullable=True)
    squat_future = db.Column(db.Integer, nullable=True)
    clean_future = db.Column(db.Integer, nullable=True)
    deadlift_future = db.Column(db.Integer, nullable=True)
    dream_build = db.Column(db.String(250), nullable=True)

    # Relationships
    posts = db.relationship("Post", backref="user", passive_deletes=True)
    comments = db.relationship("Comment", backref="user", passive_deletes=True)
    likes = db.relationship("Like", backref="user", passive_deletes=True)

    # Following
    def follow(self, user):
        if not self.is_following(user):
            follow = Follow(follower_id=self.user_id, followed_id=user.user_id)
            db.session.add(follow)
    
    def unfollow(self, user):
        follow = Follow.query.filter_by(follower_id=self.user_id, followed_id=user.user_id).first()
        if follow:
            db.session.delete(follow)
    
    def is_following(self, user):
        return Follow.query.filter_by(follower_id=self.user_id, followed_id=user.user_id).count() > 0

    def mutual_followers_count(self):
        following_query = Follow.query.filter_by(follower_id=self.user_id).subquery()
        followers_query = Follow.query.filter_by(followed_id=self.user_id).subquery()

        mutual_followers = db.session.query(Follow).filter(
            Follow.follower_id == self.user_id,  
            Follow.followed_id.in_(db.session.query(Follow.follower_id).filter_by(followed_id=self.user_id))  
        )

        return mutual_followers.count()

    # Timezone Conversion
    def convert_to_utc(self, local_time):
        user_timezone = timezone(self.timezone)
        local_time_with_tz = user_timezone.localize(local_time)
        utc_time = local_time_with_tz.astimezone(utc)
        return utc_time
    
    def convert_to_localtime(self, utc_time):
        user_timezone = timezone(self.timezone)
        local_time_with_tz = utc.localize(utc_time).astimezone(user_timezone)
        return local_time_with_tz

    # Override get_id to take user_id instead of id 
    def get_id(self):
        return str(self.user_id)  

    def __repr__(self):
        return f'<User {self.username}>'

class Post(db.Model):
    __tablename__ = 'posts'  

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    text = db.Column(db.Text, nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)
    image_mime_type = db.Column(db.String(50), nullable=True)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    author = db.Column(db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)

    comments = db.relationship("Comment", backref="post", passive_deletes=True)
    likes = db.relationship("Like", backref="post", passive_deletes=True)

class Comment(db.Model):
    __tablename__ = 'comments'  

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    author = db.Column(db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    # Add likes to comments
    #likes = db.relationship("Like", backref="comment", passive_deletes=True)

class Like(db.Model):
    __tablename__ = 'likes'  

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    author = db.Column(db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)

class Follow(db.Model):
    __tablename__ = 'follows'

    follower_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    timestamp = db.Column(db.DateTime, default=func.now(), nullable=False)

    follower = db.relationship('User', foreign_keys=[follower_id], backref=db.backref('following', lazy='dynamic'))
    followed = db.relationship('User', foreign_keys=[followed_id], backref=db.backref('followers', lazy='dynamic'))

