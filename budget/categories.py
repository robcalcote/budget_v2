from flask import (
    Blueprint, request, jsonify
)
from werkzeug.exceptions import abort
from budget.db import get_db_connection, get_db_cursor
bp = Blueprint('categories', __name__)

def get_category(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
		f'SELECT c.Id, c.Description, c.Expense, c.Recurring' +
		f' FROM categories c WHERE c.Id = {id};'
    )
    category = curs.fetchone()

    if category is None:
        abort(404, f'Not Found')

    return category

def get_categories():
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
		f'SELECT c.Id, c.Description, c.Expense, c.Recurring' +
		f' FROM categories c ORDER BY c.Description ASC;'
    )
    categories = curs.fetchall()
    return categories

def validate_categories_fields(description=None, expense=None, recurring=None):
	error = None
	if not description:
		error = 'Description is required'
	if not expense:
		error = 'Expense is required'
	if not recurring:
		error = 'Recurring is required'
	return error

def create_category(description, expense, recurring):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'INSERT INTO categories (Description, Expense, Recurring)' + 
		f' VALUES ("{description}", {expense}, {recurring});'
	)
	db.commit()

def update_category(id, description, expense, recurring):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'UPDATE categories' + 
		f' SET Description="{description}", Expense={expense}, Recurring={recurring}' +
		f' WHERE Id = {id};'
	)
	db.commit()

def delete_category(id):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(f'DELETE FROM categories WHERE Id = {id};')
	db.commit()


@bp.route('/categories/<int:id>', methods=(['GET']))
def get_one_category(id):
	c = get_category(id)
	return jsonify(c)

@bp.route('/categories', methods=(['GET']))
def get_all_categories():
	c = get_categories()
	return jsonify(c)

@bp.route('/categories/create', methods=(['POST']))
def post_one_category():
	req = request.json
	print(req)
	description = req['description'] if ('description' in req) else None
	expense = req['expense'] if ('expense' in req) else None
	recurring = req['recurring'] if ('recurring' in req) else None
	print(description)
	print(expense)
	print(recurring)
	error = validate_categories_fields(description, expense, recurring)
	if error is not None:
		return {'error': error}
	else:
		create_category(description, expense, recurring)
		return {'response': 'success'}

@bp.route('/categories/<int:id>/update', methods=(['PUT']))
def update_one_category(id):
	c = get_category(id)
	req = request.json
	description = req['description'] if ('description' in req) else c['Description']
	expense = req['expense'] if ('expense' in req) else c['Expense']
	recurring = req['recurring'] if ('recurring' in req) else c['Recurring']
	if req == {}:
		return {'error': 'Please specify which field you wish to update'}
	else:
		update_category(id, description, expense, recurring)
		c = get_category(id)
		return c

@bp.route('/categories/<int:id>/delete', methods=(['DELETE']))
def delete_one_category(id):
    get_category(id) # error handling
    delete_category(id)
    return {'response': 'success'}