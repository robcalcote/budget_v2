# DB
from flask_mysqldb import MySQL

from flask import current_app, g

import credentials as c

def get_db(app):
    if 'db' not in g:
        g.db = MySQL(app)
    
    return g.db

@current_app.teardown_appcontext
def teardown_db(exception):
    db = g.pop('db', None)

    if db is not None:
        db.connect.close()
