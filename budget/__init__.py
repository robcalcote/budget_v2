import os

from flask import (
    Flask, render_template
)

from . import db
from . import auth
from . import transactions

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'budget.sqlite'),
    )

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

    # @app.route('/transaction/<uuid:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
    # def transaction(id):
    #     return f'Transaction id #{id}'

    # @app.route('/categories', methods=['GET'])
    # def categories():
    #     return f'All Categories'

    # @app.route('/category/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
    # def category(id):
    #     return f'Category id #{id}'

    # @app.route('/months', methods=['GET'])
    # def months():
    #     return f'All Months'

    # @app.route('/month/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
    # def month(id):
    #     return f'Month # {id}'

    # @app.route('/users', methods=['GET'])
    # def users():
    #     return f'All Users'

    # @app.route('/user/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
    # def user(id):
    #     return f'User # {id}'

    db.init_app(app)
    app.register_blueprint(auth.bp)
    app.register_blueprint(transactions.bp)
    app.add_url_rule('/', endpoint='index')

    return app
