import datetime

from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)
from flask_mysqldb import MySQL
from werkzeug.exceptions import abort

from budget.auth import login_required

bp = Blueprint('transactions', __name__)

def get_transaction(id, check_author=True):
    db = MySQL().connection.cursor()
    db.execute(
        f"SELECT t.Id, t.Location, t.Amount, t.Date" +
        f" FROM Transactions t WHERE t.Id = {id}"
    )
    transaction = db.fetchone()

    if transaction is None:
        abort(404, f"Transaction id {id} doesn't exist.")

    return transaction

@bp.route('/')
def index():
    db = MySQL().connection.cursor()
    db.execute(
        'SELECT t.Id, t.UserId, t.Location, t.Amount, t.Date'
        ' FROM Transactions t'
        ' ORDER BY t.Date DESC'
    )
    transactions = db.fetchall()
    return render_template('transactions/index.html', transactions=transactions)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        loc = request.form['location']
        amount = request.form['amount']
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        error = None

        if not loc:
            error = 'Location is required'
        if not amount:
            error = 'Amount is required'
        if error is not None:
            flash(error)

        else:
            conn = MySQL().connection
            curs = conn.cursor()
            curs.execute(
                f"INSERT INTO Transactions (UserId, CategoryId, MonthId, Location, Amount, Date)" +
                f" VALUES (10, 1, 1, '{loc}', {float(amount)}, '{date}')"
            )
            conn.commit()
            return redirect(url_for('transactions.index'))

    return render_template('transactions/create.html')

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    t = get_transaction(id)

    if request.method == 'POST':
        loc = request.form['location']
        amount = request.form['amount']
        error = None

        if not loc:
            error = 'Location is required.'
        if not amount:
            error = 'Amount is required'
        if error is not None:
            flash(error)

        else:
            conn = MySQL().connection
            curs = conn.cursor()
            query = f"UPDATE Transactions SET Location = '{loc}', Amount = {amount} WHERE Id = {id}"
            curs.execute(query)
            conn.commit()
            return redirect(url_for('transactions.index'))

    return render_template('transactions/update.html', t=t)

@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_transaction(id)
    conn = MySQL().connection
    curs = conn.cursor()
    curs.execute(f"DELETE FROM Transactions WHERE Id = {id}")
    conn.commit()
    return redirect(url_for('transactions.index'))