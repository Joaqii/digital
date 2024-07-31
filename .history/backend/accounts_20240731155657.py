from flask_login import UserMixin, login_user, logout_user, current_user
from . import db

class User(db.Model, db.User)