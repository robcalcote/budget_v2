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
        f'SELECT t.Id, t.Location, t.Amount, t.Date AS Date, t.CategoryId' +
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
        f'SELECT t.Id, t.Location, t.Amount, t.Date, c.Id AS CategoryId, c.Description as Category'
        f' FROM transactions t INNER JOIN Categories c ON t.CategoryId = c.Id;'
        f' ORDER BY t.Date DESC;'
    )
    t = curs.fetchall()
    return t

def validate_transactions_fields(loc=None, amount=None, date=None, catId=None):
    error = None
    if not loc:
        error = 'Location is required'
    if not amount:
        error = 'Amount is required'
    if not date:
        error = 'Date is required'
    if not catId:
        error = 'Category Id is required'
    return error

def create_transaction(loc, amount, date):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'INSERT INTO transactions (CategoryId, MonthId, Location, Amount, Date)' +
        f' VALUES (1, 1, "{loc}", {amount}, "{date}");'
    )
    db.commit()

def update_transaction(id, loc, amount, date, catId):
    db = get_db_connection()
    curs = get_db_cursor(db)
    curs.execute(
        f'UPDATE transactions SET Location = "{loc}", Amount = {amount}, Date = "{date}", CategoryId = {catId} WHERE Id = {id};'
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
    catId = req['categoryId'] if ('categoryId' in req) else None
    error = validate_transactions_fields(loc, amount, date, catId)
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
    catId = req['categoryId'] if ('categoryId' in req) else t['CategoryId']
    if req == {}:
        return {'error': 'Please specify which field you wish to update'}
    else:
        update_transaction(id, loc, amount, date, catId)
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
    