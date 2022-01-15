import datetime

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from budget.auth import login_required
from budget.db import get_db

bp = Blueprint('transactions', __name__)

def get_transaction(id, check_author=True):
    t = get_db().execute(
        'SELECT t.id, t.Organization, t.Amount, t.Date'
        ' FROM Transactions t '
        ' WHERE t.id = ?',
        (id,)
    ).fetchone()

    if t is None:
        abort(404, f"Transaction id {id} doesn't exist.")

    return t

@bp.route('/')
def index():
    db = get_db()
    transactions = db.execute(
        'SELECT t.id, t.UserId, t.Organization, t.Amount, t.Date'
        ' FROM Transactions t'
        ' ORDER BY t.Date DESC'
    ).fetchall()
    return render_template('transactions/index.html', transactions=transactions)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        org = request.form['organization']
        amount = float(request.form['amount'])
        date = datetime.datetime.now()
        error = None

        if not org:
            error = 'Transaction location is required'
        if not amount:
            error = 'Amount is required'
        if error is not None:
            flash(error)

        else:
            db = get_db()
            db.execute(
                'INSERT INTO Transactions (UserId, CategoryId, MonthId, Organization, Amount, Date)'
                ' VALUES (1, 1, 1, ?, ?, ?)',
                (org, amount, date)
            )
            db.commit()
            return redirect(url_for('transactions.index'))

    return render_template('transactions/create.html')

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    t = get_transaction(id)

    if request.method == 'POST':
        org = request.form['organization']
        amount = request.form['amount']
        error = None

        if not org:
            error = 'Transaction location is required.'
        if not amount:
            error = 'Amount is required'
        if error is not None:
            flash(error)

        else:
            db = get_db()
            db.execute(
                'UPDATE Transactions SET Organization = ?, Amount = ?'
                ' WHERE id = ?',
                (org, amount, id)
            )
            db.commit()
            return redirect(url_for('transactions.index'))

    return render_template('transactions/update.html', t=t)

@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_transaction(id)
    db = get_db()
    db.execute('DELETE FROM Transactions WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('transactions.index'))