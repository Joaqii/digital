from flask import Flask, blueprints, Blueprint
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_cors import CORS
import os

templates_dir = os.path.abspath('./templates')
static_dir = os.path.abspath('./static')
db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins=["http://127.0.0.1:5000", "http://localhost:5000"])

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SECRET_KEY'] = 'secret'
    db.init_app(app)
    CORS(app, origins=["http://127.0.0.1:5000", "http://localhost:5000"])
    socketio.init_app(app, cors_allowed_origins=["http://127.0.0.1:5000", "http://localhost:5000"])
    
    from .accounts import User
    
    with app.app_context():
        db.create_all()
    login_manager = LoginManager()
    login_manager.init_app(app)
    
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    from .routes import routes
    from .accounts import database
    
    app.register_blueprint(database)
    app.register_blueprint(routes, url_prefix="/")

    return app