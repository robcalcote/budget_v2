from flask import (
    g, current_app
)
from flask_mysqldb import MySQL
import credentials as c

def get_db(app):
    if 'db' not in g:
        g.db = MySQL(app)
        g.db = g.db.connection
    return g.db

def get_db_connection():
    return MySQL().connection

def get_db_cursor(conn):
    return conn.cursor()

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)