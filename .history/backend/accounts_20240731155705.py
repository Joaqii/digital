from flask_login import UserMixin, login_user, logout_user, current_user
from . import db

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))

    def __repr__(self):
        return f'<User {self.username}>'