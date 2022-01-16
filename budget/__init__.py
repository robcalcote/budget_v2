import os

from flask import (
    Flask, render_template, g, jsonify
)
from flask_mysqldb import MySQL

import credentials as c

from . import auth
from . import transactions
from . import db

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    app.config['MYSQL_USER'] = c.USERNAME
    app.config['MYSQL_PASSWORD'] = c.LOCAL_DB_PASSWORD
    app.config['MYSQL_HOST'] = '127.0.0.1'
    app.config['MYSQL_PORT'] = 3306
    app.config['MYSQL_DB'] = 'budget'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    mysql = MySQL(app)

    @app.route('/transactions')
    def hello_world():
        cursor = mysql.connection.cursor()
        cursor.execute('''SELECT * FROM Transactions''')
        results = cursor.fetchall()
        return jsonify(results)

    @app.route('/transactions/<int:id>', methods=('GET', 'POST'))
    def index(id):
        cursor = mysql.connection.cursor()
        cursor.execute(f'SELECT * FROM Transactions WHERE id = {id}')
        results = cursor.fetchone()
        return jsonify(results)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(auth.bp)
    app.register_blueprint(transactions.bp)
    app.add_url_rule('/', endpoint='index')

    return app
