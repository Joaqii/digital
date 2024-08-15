from flask import Flask, blueprints, Blueprint  # Importing Flask and blueprint related modules
from flask_login import LoginManager  # Importing LoginManager module from flask_login
from flask_sqlalchemy import SQLAlchemy  # Importing SQLAlchemy module from flask_sqlalchemy
from flask_socketio import SocketIO  # Importing SocketIO module from flask_socketio
from flask_cors import CORS  # Importing CORS module from flask_cors
import os  # Importing os module

templates_dir = os.path.abspath('./templates')  # Getting the absolute path of the 'templates' directory
static_dir = os.path.abspath('./static')  # Getting the absolute path of the 'static' directory
db = SQLAlchemy()  # Creating an instance of SQLAlchemy
socketio = SocketIO(cors_allowed_origins="*")  # Creating an instance of SocketIO with CORS enabled for all origins

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)  # Creating a Flask app instance with template and static folders
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Configuring the database URI
    app.config['SECRET_KEY'] = 'secret'  # Setting the secret key for the app
    db.init_app(app)  # Initializing the SQLAlchemy app with the Flask app
    CORS(app, origins="*")  # Enabling CORS for all origins
    socketio.init_app(app)  # Initializing the SocketIO app with the Flask app
    
    from .accounts import User  # Importing the User model from the accounts module
    
    with app.app_context():
        db.create_all()  # Creating all the database tables
    login_manager = LoginManager()  # Creating an instance of LoginManager
    login_manager.init_app(app)  # Initializing the LoginManager with the Flask app
    
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))  # Loading the user from the database based on the user_id
    
    from .routes import routes  # Importing the routes blueprint
    from .accounts import database  # Importing the database blueprint
    
    app.register_blueprint(database)  # Registering the database blueprint with the Flask app
    app.register_blueprint(routes, url_prefix="/")  # Registering the routes blueprint with the Flask app and setting the URL prefix to "/"
    
    return app  # Returning the Flask app instance