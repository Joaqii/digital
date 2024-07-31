from flask import Flask, blueprints
from flask_login import UserMixin
import os

templates_dir = os.path.abspath('./templates')
static_dir = os.path.abspath('./static')
db = SQLALchemy()

def create_app():
    app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SECRET_KEY'] = 'secret'
    
    from .accounts import db, User
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
        from .routes import routes
        from .accounts import database
    
    app.register_blueprint(database, url_prefix="/")
    app.register_blueprint(routes, url_prefix="/")

    return app