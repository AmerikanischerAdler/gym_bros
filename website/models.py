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
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
#    posts = db.relationship("Post", backref="user", passive_deletes=True)

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

#class Post(db.Model):
#    __tablename__ = 'posts'  
#    
#    user_id = db.Column(db.Integer, primary_key=True)
#    text = db.Column(db.Text, nullable=False)
#    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
#    author = db.Column(db.Integer, db.ForeignKey("user.user_id", ondelete="CASCADE"), nullable=False)
#

