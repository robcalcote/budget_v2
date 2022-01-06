from flask import Flask
from flask import url_for
from flask import render_template
from flask import request


app = Flask(__name__)

@app.route("/")
def index():
    return 'Home Page'

@app.route('/transactions', methods=['GET'])
def transactions():
    return f'All Transactions'

@app.route('/transaction/<uuid:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def transaction(id):
    return f'Transaction id #{id}'

@app.route('/categories', methods=['GET'])
def categories():
    return f'All Categories'

@app.route('/category/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def category(id):
    return f'Category id #{id}'

@app.route('/months', methods=['GET'])
def months():
    return f'All Months'

@app.route('/month/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def month(id):
    return f'Month # {id}'

@app.route('/users', methods=['GET'])
def users():
	return f'All Users'

@app.route('/user/<int:id>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def user(id):
	return f'User # {id}'

# as you can see, you can reference the function and get the name of the url route
with app.test_request_context():
    print(url_for('transactions'))
    print(url_for('categories'))
    print(url_for('category', id=456))
    print(url_for('months'))
    print(url_for('month', id=789))
    print(url_for('users'))
    print(url_for('user', id=100))
    print(url_for('transactions', next='/'))

# this is how you render a template
@app.route('/hello/')
@app.route('/hello/<string:name>')
def hello(name=None):
    return render_template('hello.html', name=name)