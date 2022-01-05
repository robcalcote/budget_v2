from flask import Flask

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
