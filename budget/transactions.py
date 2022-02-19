from flask import (
    Blueprint, request, jsonify
)
from werkzeug.exceptions import abort
from budget.db import get_db_connection, get_db_cursor
bp = Blueprint('transactions', __name__)

def get_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'SELECT t.Id, t.Location, t.Amount, t.Date AS Date' +
        f' FROM transactions t WHERE t.Id = {id};'
    )
    transaction = curs.fetchone()
    if transaction is None:
        abort(404, f'Not Found')
    return transaction

def get_transactions():
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'SELECT t.Id, t.Location, t.Amount, t.Date, c.Description AS Category'
        f' FROM transactions t INNER JOIN Categories c ON t.CategoryId = c.Id;'
        f' ORDER BY t.Date DESC;'
    )
    t = curs.fetchall()
    return t

def reformat_transaction_dates(transactions):
    for t in transactions:
        day = t['Date'].strftime('%a')
        m = t['Date'].strftime('%b')
        d = t['Date'].strftime('%d')
        t['Date'] = day + ' - ' + m + ' ' + d

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
        f'INSERT INTO Transactions (CategoryId, MonthId, Location, Amount, Date)' +
        f' VALUES (1, 1, "{loc}", {amount}, "{date}");'
    )
    db.commit()

def update_transaction(id, loc, amount, date):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'UPDATE transactions SET Location = "{loc}", Amount = {amount}, Date = "{date}" WHERE Id = {id};'
    )
    db.commit()

def delete_transaction(id):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'DELETE FROM transactions WHERE Id = {id};'
    )
    db.commit()


@bp.route('/transactions/<int:id>', methods=(['GET']))
def get_one_transaction(id):
    t = get_transaction(id)
    res = {
        'response': 'success',
        'transactions': t
    }
    return res

@bp.route('/transactions', methods=(['GET']))
def get_all_transactions():
    t = get_transactions()
    reformat_transaction_dates(t)
    res = {
        'response': 'success',
        'transactions': t
    }
    return res

@bp.route('/transactions/create', methods=(['POST']))
def post_one_transaction():
    req = request.json
    loc = req['location'] if ('location' in req) else None
    date = req['date'] if ('date' in req) else None
    amount = req['amount'] if ('amount' in req) else None
    error = validate_transactions_fields(loc, amount, date)
    if error is not None:
        return {'error': error}
    else:
        create_transaction(loc, amount, date)
        res = {
            'response': 'success',
        }
        return res

@bp.route('/transactions/<int:id>/update', methods=(['PUT']))
def update_one_transaction(id):
    t = get_transaction(id)
    req = request.json
    loc = req['location'] if ('location' in req) else t['Location']
    amount = req['amount'] if ('amount' in req) else t['Amount']
    date = req['date'] if ('date' in req) else t['Date']
    if req == {}:
        return {'error': 'Please specify which field you wish to update'}
    else:
        update_transaction(id, loc, amount, date)
        t = get_transaction(id)
        res = {
            'response': 'success',
            'transactions': t
        }
        return res

@bp.route('/transactions/<int:id>/delete', methods=(['DELETE']))
def delete_one_transaction(id):
    get_transaction(id) # error handling
    delete_transaction(id)
    res = {
        'response': 'success'
    }
    return res
    