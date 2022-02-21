from flask import (
    Flask, g
)
from flask_cors import CORS

import credentials as c


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    
    app.config.from_mapping(
        SECRET_KEY='dev',
        MYSQL_USER=c.USERNAME,
        MYSQL_PASSWORD=c.LOCAL_DB_PASSWORD,
        MYSQL_HOST='localhost',
        MYSQL_PORT=3306,
        MYSQL_DB='budget',
        MYSQL_CURSORCLASS='DictCursor'
    )

    with app.app_context():
        from . import auth, db, categories, months, transactions
        g.db = db.get_db(app)
        app.register_blueprint(auth.bp)
        app.register_blueprint(categories.bp)
        app.register_blueprint(months.bp)
        app.register_blueprint(transactions.bp)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    with app.app_context():
        db.init_app(app)

    return app
