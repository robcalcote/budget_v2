import os

from flask import (
    Flask, render_template, g, jsonify
)
from flask_mysqldb import MySQL

import credentials as c

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)

    app.secret_key = 'test secret key'
    app.config['MYSQL_USER'] = c.USERNAME
    app.config['MYSQL_PASSWORD'] = c.LOCAL_DB_PASSWORD
    app.config['MYSQL_HOST'] = '127.0.0.1'
    app.config['MYSQL_PORT'] = 3306
    app.config['MYSQL_DB'] = 'budget'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    
    with app.app_context():
        from . import db
        g.db = db.get_db(app)
    
    @app.route('/transactions')
    def transactions():
        curs = MySQL().connection.cursor()
        curs.execute('''SELECT * FROM Transactions''')
        results = curs.fetchall()
        return jsonify(results)

    @app.route('/transactions/<int:id>', methods=('GET', 'POST'))
    def transaction(id):
        curs = MySQL().connection.cursor()
        curs.execute(f'SELECT * FROM Transactions WHERE Id = {id}')
        results = curs.fetchone()
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

    with app.app_context():
        from . import auth
        from . import transactions
        app.register_blueprint(auth.bp)
        app.register_blueprint(transactions.bp)

    app.add_url_rule('/', endpoint='transactions.index')

    return app
