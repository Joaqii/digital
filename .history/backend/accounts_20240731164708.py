from flask_login import UserMixin, login_user, logout_user, current_user
from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy
from . import db

database = Blueprint('database', '__main__')

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    
class Posts(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    content = db.Column(db.String(1000))
    author = db.Column(db.String(50))


@database.route("/action/register", methods=['POST'])
def register():
    data = 