from flask import Flask, blueprints
from flask_login import UserMixin, LoginManager
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
    
    from 
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    with app.app_context():
        db.create_all()
    
        from .routes import routes
        from .accounts import database
    
    app.register_blueprint(database, url_prefix="/")
    app.register_blueprint(routes, url_prefix="/")

    return app