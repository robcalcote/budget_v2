import pytest
from flask import g, session

from flask_mysqldb import MySQL


def test_register(client, app):
    assert client.get('/auth/register').status_code == 200
    response = client.post(
        '/auth/register', data={
            'first_name': 'test_fname', 
            'last_name': 'test_lname',
            'username': 'a',
            'password': 'a'
        }
    )
    assert 'http://localhost/auth/login' == response.headers['Location']

    with app.app_context():
        assert MySQL().connection.cursor().execute(
            "SELECT * FROM Users WHERE Username = 'a'",
        ).fetchone() is not None


@pytest.mark.parametrize(('first_name', 'last_name', 'username', 'password', 'message'), (
    ('', '', '', '', b'First Name is required.'),
    ('rob', '', '', '', b'Last Name is required.'),
    ('rob', 'calcote', '', '', b'Username is required.'),
    ('rob', 'calcote', 'test12345', '', b'Password is required.'),
    ('fname', 'lname', 'test', 'password123', b'already registered'),
))
def test_register_validate_input(client, first_name, last_name, username, password, message):
    response = client.post(
        '/auth/register',
        data={
            'first_name': first_name, 
            'last_name': last_name, 
            'username': username, 
            'password': password
        }
    )
    assert message in response.data


def test_login(client, auth):
    assert client.get('/auth/login').status_code == 200
    response = auth.login()
    assert response.headers['Location'] == 'http://localhost/auth/login'

    with client:
        client.get('/')
        assert session['user_id'] == 1
        assert g.user['username'] == 'test'


@pytest.mark.parametrize(('username', 'password', 'message'), (
    ('a', 'test', b'Incorrect username.'),
    ('test', 'a', b'Incorrect password.'),
))
def test_login_validate_input(auth, username, password, message):
    response = auth.login(username, password)
    assert message in response.data


def test_logout(client, auth):
    auth.login()

    with client:
        auth.logout()
        assert 'user_id' not in session