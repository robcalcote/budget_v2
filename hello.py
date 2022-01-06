from flask import Flask

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