from flask_login import UserMixin, login_user, logout_user, current_user
from flask import Blueprint, request, jsonify
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

def checkUsername(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return True
    return False

@database.route("/action/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    if checkUsername(username):
        return jsonify({"success": "negative"})
    else:
        return jsonify({"success": "positive"})