import datetime
from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from budget.auth import login_required
from budget.db import get_db_connection, get_db_cursor
bp = Blueprint('transactions', __name__)

def get_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'SELECT t.Id, t.Location, t.Amount, t.Date' +
        f' FROM Transactions t WHERE t.Id = {id};'
    )
    transaction = curs.fetchone()

    if transaction is None:
        abort(404, f'Transaction id {id} doesn\'t exist.')

    return transaction

def get_transactions():
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'SELECT t.Id, t.UserId, t.Location, t.Amount, t.Date'
        f' FROM Transactions t ORDER BY t.Date DESC;'
    )
    t = curs.fetchall()

    return t

def validate_transactions_fields(loc=None, amount=None):
    error = None
    if not loc:
        error = 'Location is required'
    if not amount:
        error = 'Amount is required'
    return error

def create_transaction(loc, amount, date):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'INSERT INTO Transactions (UserId, CategoryId, MonthId, Location, Amount, Date)' +
        f' VALUES (10, 1, 4, "{loc}", {amount}, "{date}");'
    )
    db.commit()

def update_transaction(id, loc, amount):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'UPDATE Transactions SET Location = "{loc}", Amount = {amount} WHERE Id = {id};'
    )
    db.commit()

def delete_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'DELETE FROM Transactions WHERE Id = {id};'
    )
    db.commit()

@bp.route('/')
def index():
    transactions = get_transactions()
    return render_template('transactions/index.html', transactions=transactions)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        loc = request.form['location']
        amount = request.form['amount']
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        error = validate_transactions_fields(loc, amount)
        if error is not None:
            flash(error)

        else:
            create_transaction(loc, amount, date)
            return redirect(url_for('transactions.index'))

    return render_template('transactions/create.html')

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    t = get_transaction(id)

    if request.method == 'POST':
        loc = request.form['location']
        amount = request.form['amount']

        error = validate_transactions_fields(loc, amount)
        if error is not None:
            flash(error)

        else:
            update_transaction(id, loc, amount)
            return redirect(url_for('transactions.index'))

    return render_template('transactions/update.html', t=t)

@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    delete_transaction(id)
    return redirect(url_for('transactions.index'))