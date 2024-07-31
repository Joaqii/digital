from flask import Flask, blueprints
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import os

templates_dir = os.path.abspath('./templates')
static_dir = os.path.abspath('./static')

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)
    db = SQLAlchemy(app)
    app.config['']
    app.config['SECRET_KEY'] = 'secret'
    
    from .routes import routes
    
    app.register_blueprint(routes, url_prefix="/")

    return app