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
    hierarchy = db.Column(db.Integer, nullable=True)
    
class Posts(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000))
    author = db.Column(db.String(50))

def checkUsername(username):
    # Check if a user with the given username exists in the database
    user = User.query.filter_by(username=username).first()
    if user:
        return True
    return False

@database.route("/action/checklogin", methods=['GET'])
def checklogin():
    # Check if the current user is authenticated
    if current_user.is_authenticated:
        return jsonify({"success": "positive"})
    return jsonify({"success": "negative"})

@database.route("/action/logout", methods=['GET'])
def logout():
    # Logout the current user
    logout_user()
    return jsonify({"success": "positive"})

@database.route("/action/login", methods=['POST'])
def login():
    # Login the user with the provided username and password
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
    # Register a new user with the provided username and password
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
    # Create a new post with the provided content and author
    data = request.get_json()
    content = data.get("content")
    author = current_user.username
    post = Posts(content=content, author=author)
    db.session.add(post)
    db.session.commit()
    id = db.session.query(Posts).order_by(Posts.id.desc()).first()

    print("emitting")
    socketio.emit('post', {'author': author, 'content': content, "current_user": current_user.username, "id": id.id})
    print("emitted")
    return jsonify({"success": "positive"})

@database.route("/action/delete", methods=['POST'])
def delete():
    # Delete a post with the provided id
    data = request.get_json()
    id = data.get("id")
    post = Posts.query.filter_by(id=id).first()
    db.session.delete(post)
    db.session.commit()
    socketio.emit('delete', {'id': id})
    return jsonify({"success": "positive"})

@database.route("/action/getusername", methods=['GET'])
def getusername():
    # Get the username of the current authenticated user
    if current_user.is_authenticated:
        return jsonify({"username": current_user.username})

@socketio.on('connect')
def test_connect():
    # Handle client connection event
    print('Client connected')
    socketio.emit('message', {'data': 'Hello from Flask'})

@socketio.on("test_event")
def handle_test_event(data):
    # Handle test event received from the client
    print('Test event received:', data)  # Accept the data parameter