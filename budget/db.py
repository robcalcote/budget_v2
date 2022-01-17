# DB
from flask_mysqldb import MySQL

from flask import g

import credentials as c

def get_db(app):
    if 'db' not in g:
        g.db = MySQL(app)
    
    return g.db
