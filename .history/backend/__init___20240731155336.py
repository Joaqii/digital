from flask import Flask, blueprints
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)
import os

templates_dir = os.path.abspath('./templates')
static_dir = os.path.abspath('./static')

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)
    
    from .routes import routes
    
    app.register_blueprint(routes, url_prefix="/")

    return app