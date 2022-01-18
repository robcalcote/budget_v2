import datetime
from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from budget.auth import login_required
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
        abort(404, f"Month id {id} doesn't exist.")

    return month

def get_months():
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
		f'SELECT m.Id, m.Month, m.Year, m.Savings, m.Projected, m.Actual' +
		f' FROM Months m ORDER BY m.Year DESC, m.Month DESC;'
    )
    months = curs.fetchall()
    for m in months:
        m['month_and_year'] = datetime.datetime(m['Year'], m['Month'], 1)
    return months

def validate_months_fields(projected=None, actual=None, savings=None):
	error = None
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

def update_month(id, projected, actual, savings):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(
		f'UPDATE Months' + 
		f' SET Savings={savings}, Projected={projected}, Actual={actual}' +
		f' WHERE Id = {id}'
	)
	db.commit()

def update_month_actual(id, actual):
	db = get_db_connection()
	curs = get_db_cursor(db)

def delete_month(id):
	db = get_db_connection()
	curs = get_db_cursor(db)
	curs.execute(f'DELETE FROM Months WHERE Id = {id}')
	db.commit()

@bp.route('/months')
def index():
	months = get_months()
	return render_template('months/index.html', months=months)

@bp.route('/months/create', methods=('GET', 'POST'))
@login_required
def create():
	now = datetime.datetime.now()
	month = now.strftime('%B')
	year = now.strftime('%Y')

	if request.method == 'POST':
		projected = request.form['projected']
		actual = request.form['actual']
		savings = request.form['savings']

		error = validate_months_fields(savings, projected, actual)
		if error is not None:
			flash(error)

		else:
			create_month(now.strftime('%m'), now.strftime('%Y'), projected, actual, savings)
			return redirect(url_for('months.index'))

	return render_template('months/create.html', month=month, year=year)

@bp.route('/months/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
	m = get_month(id)
	now = datetime.datetime.now()
	month = now.strftime('%B')
	year = now.strftime('%Y')

	if request.method == 'POST':
		savings = request.form['savings']
		projected = request.form['projected']
		actual = request.form['actual']

		error = validate_months_fields(projected, actual, savings)
		if error is not None:
			flash(error)

		else:
			update_month(id, projected, actual, savings)
			return redirect(url_for('months.index'))

	return render_template('months/update.html', m=m, month=month, year=year)

@bp.route('/months/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
	delete_month(id)
	return redirect(url_for('months.index'))
