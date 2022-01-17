import pytest
from flask import g, session

from flask_mysqldb import MySQL


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


@pytest.mark.parametrize(('username', 'password', 'message'), (
    ('a', 'test', b'Incorrect username or password'),
    ('test', 'a', b'Incorrect username or password'),
))
def test_login_validate_input(auth, username, password, message):
    response = auth.login(username, password)
    assert message in response.data


def test_logout(client, auth):
    auth.login()

    with client:
        auth.logout()
        assert 'user_id' not in session