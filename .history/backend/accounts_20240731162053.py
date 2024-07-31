from flask_login import UserMixin, login_user, logout_user, current_user
from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy

database = Blueprint('database', '__main__')
db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))