from flask import Flask, blueprints
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import os

templates_dir = os.path.abspath('./templates')
static_dir = os.path.abspath('./static')
db = SQLAlchemy()

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SECRET_KEY'] = 'secret'
    db.init_app(app)

    
    from .accounts import database
    from .routes import routes
    
    with app.app_context():
        db.create_all()
    
    app.register_blueprint(routes, url_prefix="/")

    return app