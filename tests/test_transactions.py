import pytest
import datetime
from flask_mysqldb import MySQL


def test_index(client, auth):
    response = client.get('/')
    assert b"Log In" in response.data
    assert b"Register" in response.data

    auth.login()
    response = client.get('/')
    date = str.encode('On ' + str(datetime.datetime.utcnow().date()))
    assert b'Log Out' in response.data
    assert b'Transactions - Budget' in response.data
    assert b'Costco' in response.data
    assert date in response.data
    assert b'Edit' in response.data
    assert b'102.56' in response.data
    assert b'href="/1/update"' in response.data


@pytest.mark.parametrize('path', (
    '/create',
    '/1/update',
    '/1/delete',
))
def test_login_required(client, path):
    response = client.post(path)
    assert response.headers['Location'] == 'http://localhost/auth/login'


@pytest.mark.parametrize('path', (
    '/2/update',
    '/2/delete',
))
def test_exists_required(client, auth, path):
    auth.login()
    assert client.post(path).status_code == 404


def test_create(client, auth, app):
    auth.login()
    assert client.get('/create').status_code == 200
    client.post('/create', data={'location': 'test_loc', 'amount': '123.45'})

    with app.app_context():
        db = MySQL().connection.cursor()
        count = db.execute('SELECT COUNT(id) FROM Transactions').fetchone()[0]
        assert count == 2


def test_update(client, auth, app):
    auth.login()
    assert client.get('/1/update').status_code == 200
    client.post('/1/update', data={'location': 'updated', 'amount': '123'})

    with app.app_context():
        db = MySQL().connection.cursor()
        post = db.execute('SELECT * FROM Transactions WHERE Id = 1').fetchone()
        assert post['location'] == 'updated'


@pytest.mark.parametrize('path', (
    '/create',
    '/1/update',
))
def test_create_update_validate_no_location(client, auth, path):
    auth.login()
    response = client.post(path, data={'location': '', 'amount': '123'})
    assert b'Location is required' in response.data

@pytest.mark.parametrize('path', (
    '/create',
    '/1/update',
))
def test_create_update_validate_no_amount(client, auth, path):
    auth.login()
    response = client.post(path, data={'location': 'test_loc', 'amount': ''})
    assert b'Amount is required' in response.data


def test_delete(client, auth, app):
    auth.login()
    response = client.post('/1/delete')
    assert response.headers['Location'] == 'http://localhost/auth/login'

    with app.app_context():
        db = MySQL().connection.cursor()
        db.execute("SELECT * FROM Transactions WHERE id = 1")
        post = db.fetchone()
        assert post is None