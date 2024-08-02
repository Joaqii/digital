from flask import Blueprint, render_template, flash
from flask_login import current_user, login_required
from .accounts import Posts
socketio = SocketIO(app)

def get_posts_from_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT author, content FROM posts")
    posts = [{'author': row[0], 'content': row[1]} for row in cursor.fetchall()]
    conn.close()
    return posts

routes = Blueprint('routes', '__main__')

@routes.route('/')
@routes.route('/home')
def home():
    selected_route = 'home'
    return render_template('home.html', selected_route=selected_route, current_user=current_user)

@routes.route('/forum')
def forum():
    posts = Posts.query.all()
    selected_route = 'forum'
    return render_template('pages/forum.html', selected_route=selected_route, current_user=current_user, posts=posts)

@routes.route("/account")
def account():
    selected_route = 'account'
    return render_template('pages/account.html', selected_route=selected_route, current_user=current_user)