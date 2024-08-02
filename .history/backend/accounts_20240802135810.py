from flask_login import UserMixin, login_user, logout_user, current_user
from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from . import db, socketio

database = Blueprint('database', '__main__')

def get_posts_from_db():
    return Posts.query.all()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    
class Posts(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000))
    author = db.Column(db.String(50))

def checkUsername(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return True
    return False

@database.route("/action/checklogin", methods=['GET'])
def checklogin():
    if current_user.is_authenticated:
        return jsonify({"success": "positive"})
    return jsonify({"success": "negative"})

@database.route("/action/logout", methods=['GET'])
def logout():
    logout_user()
    return jsonify({"success": "positive"})

@database.route("/action/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    if user:
        if user.password == password:
            login_user(user)
            return jsonify({"success": "positive"})
    return jsonify({"success": "negative"})

@database.route("/action/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if checkUsername(username):
        return jsonify({"success": "negative"})
    else:
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "positive"})
    
    
@database.route("/action/post", methods=['POST'])
def post():
    data = request.get_json()
    content = data.get("content")
    author = current_user.username
    post = Posts(content=content, author=author)
    db.session.add(post)
    db.session.commit()
    print("emitting")
    socketio.emit('post', {'author': author, 'content': content, "current_user": current_user.username})
    print("emitted")
    return jsonify({"success": "positive"})

@socketio.on('connect')
def test_connect():
    print('Client connected')
    socketio.emit('message', {'data': 'Hello from Flask'})

@socketio.on("test_event")
def handle_test_event(data):
    print('Test event received:', data)  # Accept the data parameter