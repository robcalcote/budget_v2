import functools

from flask import (
    Blueprint, flash, g, current_app, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flask_mysqldb import MySQL

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        username = request.form['username']
        password = request.form['password']
        conn = MySQL().connection
        curs = conn.cursor()
        error = None

        if not first_name:
            error = 'First Name is required.'
        elif not last_name:
            error = 'Last Name is required.'
        elif not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            try:
                curs.execute(
                    f"INSERT INTO Users (Active, FirstName, LastName, Username, Password)" +
                    f" VALUES (True, '{first_name}', '{last_name}', '{username}', '{generate_password_hash(password)}')"
                )
                conn.commit()
                conn.close()
            except curs.IntegrityError:
                error = f"User {username} is already registered."
            else:
                return redirect(url_for("auth.login"))

        flash(error)

    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = MySQL().connection.cursor()
        error = None
        db.execute(
            f"SELECT * FROM Users WHERE Username = '{username}'"
        )
        user = db.fetchone()

        if (user is None) or (not check_password_hash(user['Password'], password)):
            error = 'Incorrect username or password'

        if error is None:
            session.clear()
            session['user_id'] = user['Id']
            return redirect(url_for('transactions.index'))

        flash(error)

    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        db = MySQL().connection.cursor()
        db.execute(
            f"SELECT * FROM Users WHERE id = {user_id}"
        )
        g.user = db.fetchone()

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('transactions.index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view