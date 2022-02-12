from datetime import datetime as dt
from flask import (
    Blueprint, request
)
from werkzeug.exceptions import abort
from budget.db import get_db_connection, get_db_cursor
bp = Blueprint('months', __name__)

def get_month(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
		f'SELECT m.Id, m.Month, m.Year, m.Savings, m.Projected, m.Actual' +
		f' FROM Months m WHERE m.Id = {id};'
    )
    month = curs.fetchone()

    if month is None:
        abort(404, f'Not Found')

    return month

def get_months():
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'SELECT m.Id, m.Month, m.Year, m.Savings, m.Projected, m.Actual' +
		f' FROM Months m ORDER BY m.Year DESC, m.Month DESC;'
    )
	months = curs.fetchall()
	return months

def reformat_months_month(months):
	for m in months:
		date = dt(m['Year'], m['Month'], 1)
		m['Month'] = date.strftime('%B')

def validate_months_fields(month=None, year=None, projected=None, actual=None, savings=None):
	error = None
	if not month:
		error = 'Month is required'
	if not year:
		error = 'Year is required'
	if not projected:
		error = 'Projected is required'
	if not actual:
		error = 'Actual is required'
	if not savings:
		error = 'Savings is required'
	return error

def create_month(month, year, projected, actual, savings):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'INSERT INTO Months (Month, Year, Savings, Projected, Actual)' + 
		f' VALUES ({month}, {year}, {savings}, {projected}, {actual});'
	)
	db.commit()

def update_month(id, month, year, projected, actual, savings):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'UPDATE Months' + 
		f' SET Month={month}, Year={year}, Savings={savings}, Projected={projected}, Actual={actual}' +
		f' WHERE Id = {id};'
	)
	db.commit()

def delete_month(id):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(f'DELETE FROM Months WHERE Id = {id};')
	db.commit()

@bp.route('/months/<int:id>', methods=(['GET']))
def get_one_month(id):
	m = get_month(id)
	res = {
		'response': 'success',
		'months': m
	}
	return res

@bp.route('/months', methods=(['GET']))
def get_all_months():
	m = get_months()
	reformat_months_month(m)
	res = {
		'response': 'success',
		'months': m
	}
	return res

@bp.route('/months/create', methods=(['POST']))
def post_one_month():
	req = request.json
	month = req['month'] if ('month' in req) else None
	year = req['year'] if ('year' in req) else None
	projected = req['projected'] if ('projected' in req) else None
	actual = req['actual'] if ('actual' in req) else None
	savings = req['savings'] if ('savings' in req) else None
	error = validate_months_fields(month, year, projected, actual, savings)
	if error is not None:
		return {'error': error}
	else:
		create_month(month, year, projected, actual, savings)
		res = {
            'response': 'success',
        }
		return res

@bp.route('/months/<int:id>/update', methods=(['PUT']))
def update_one_month(id):
	m = get_month(id)
	req = request.json
	month = req['month'] if ('month' in req) else m['Month']
	year = req['year'] if ('year' in req) else m['Year']
	projected = req['projected'] if ('projected' in req) else m['Projected']
	actual = req['actual'] if ('actual' in req) else m['Actual']
	savings = req['savings'] if ('savings' in req) else m['Savings']
	if req == {}:
		return {'error': 'Please specify which field you wish to update'}
	else:
		update_month(id, month, year, projected, actual, savings)
		m = get_month(id)
		res = {
			'response': 'success',
			'months': m
		}
		return res

@bp.route('/months/<int:id>/delete', methods=(['DELETE']))
def delete_one_month(id):
    get_month(id) # error handling
    delete_month(id)
    res = {
        'response': 'success'
    }
    return res