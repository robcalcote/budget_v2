from flask import Flask
from flask import url_for
from flask import render_template
from flask import request


app = Flask(__name__)

@app.route("/")
def index():
    return 'Home Page'

@app.route('/transactions')
def transactions():
	# need to include endpoints for GET
    return f'All Transactions'

@app.route('/transaction/<uuid:id>')
def transaction(id):
	# need to include endpoints for GET, POST, PUT, DELETE
    return f'Transaction id #{id}'

@app.route('/categories')
def categories():
	# need to include endpoints for GET
    return f'All Categories'

@app.route('/category/<int:id>')
def category(id):
	# need to include endpoints for GET, POST, PUT, DELETE
    return f'Category id #{id}'

@app.route('/months')
def months():
	# need to include endpoints for GET
    return f'All Months'

@app.route('/month/<int:id>')
def month(id):
	# need to include endpoints for GET, POST, PUT, DELETE
    return f'Month # {id}'

@app.route('/users')
def users():
	# need to include endpoints for GET
	return f'All Users'

@app.route('/user/<int:id>')
def user(id):
	# need to include endpoints for GET, POST, PUT, DELETE
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