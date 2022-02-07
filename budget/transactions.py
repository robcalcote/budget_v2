from flask import (
    Blueprint, flash, request, jsonify
)
from jinja2 import Undefined
from werkzeug.exceptions import abort
from budget.db import get_db_connection, get_db_cursor
bp = Blueprint('transactions', __name__)

def get_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'SELECT t.Id, t.Location, t.Amount, UNIX_TIMESTAMP(t.Date) AS Date' +
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

def validate_transactions_fields(loc=None, amount=None, date=None):
    error = None
    if not loc:
        error = 'Location is required'
    if not amount:
        error = 'Amount is required'
    if not date:
        error = 'Date is required'
    return error

def create_transaction(loc, amount, date):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'INSERT INTO Transactions (UserId, CategoryId, MonthId, Location, Amount, Date)' +
        f' VALUES (10, 1, 4, "{loc}", {amount}, "{date}");'
    )
    db.commit()

def update_transaction(id, loc, amount, date):
    print(date)
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'UPDATE Transactions SET Location = "{loc}", Amount = {amount}, Date = "{date}" WHERE Id = {id};'
    )
    db.commit()

def delete_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'DELETE FROM Transactions WHERE Id = {id};'
    )
    db.commit()

@bp.route('/transactions')
def get_all_transactions():
    transactions = get_transactions()
    try:
        return jsonify(transactions)
    except Exception as ex:
        print(str(ex))
        return jsonify(transactions)

@bp.route('/transactions/create', methods=(['POST']))
def post_transaction():
    loc = request.json['location']
    date = request.json['date']
    amount = request.json['amount']

    error = validate_transactions_fields(loc, amount, date)
    if error is not None:
        flash(error)
    else:
        create_transaction(loc, amount, date)
        return


@bp.route('/transactions/<int:id>/update', methods=(['PUT']))
def update_one_transaction(id):
    t = get_transaction(id)
    
    req = request.json
    loc = req['location'] if ('location' in req) else None
    amount = req['amount'] if ('amount' in req) else None
    date = req['date'] if ('date' in req) else None

    error = validate_transactions_fields(loc, amount, date)
    if error is not None:
        return {"error": error}
    else:
        update_transaction(id, loc, amount, date)
        t = get_transaction(id)
        res = {
            'response': 'success',
            'transaction': t
        }
        return res

@bp.route('/transactions/<int:id>/delete', methods=(['DELETE']))
def delete_one_transaction(id):
    return delete_transaction(id)