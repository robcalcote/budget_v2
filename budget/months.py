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
        abort(404, f'Month id {id} doesn\'t exist.')

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

def validate_months_fields(date=None, projected=None, actual=None, savings=None):
	error = None
	if date == ['']:
		error = 'Month and Year is required'
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

@bp.route('/months')
def index():
	m = get_months()
	return render_template('months/index.html', months=m)

@bp.route('/months/create', methods=('GET', 'POST'))
@login_required
def create():
	if request.method == 'POST':
		date = request.form['date'].split('-')
		projected = request.form['projected']
		actual = request.form['actual']
		savings = request.form['savings']

		error = validate_months_fields(date, projected, actual, savings)
		if error is not None:
			flash(error)

		else:
			month = date[1]
			year = date[0]
			create_month(month, year, projected, actual, savings)
			return redirect(url_for('months.index'))

	now = datetime.datetime.now()
	date = now.strftime('%Y-%m')
	return render_template('months/create.html', date=date)

@bp.route('/months/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
	m = get_month(id)

	if request.method == 'POST':
		date = request.form['date'].split('-')
		savings = request.form['savings']
		projected = request.form['projected']
		actual = request.form['actual']

		error = validate_months_fields(date, projected, actual, savings)
		if error is not None:
			flash(error)

		else:
			month=date[1]
			year=date[0]
			update_month(id, month, year, projected, actual, savings)
			return redirect(url_for('months.index'))

	month = str(m['Month'])
	year = str(m['Year'])
	if len(month) == 1:
		month = "0"+month
	date = year+'-'+month
	return render_template('months/update.html', m=m, date=date)

@bp.route('/months/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
	delete_month(id)
	return redirect(url_for('months.index'))
