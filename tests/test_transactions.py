import pytest
import datetime
from flask_mysqldb import MySQL



@pytest.mark.parametrize('path', (
    '/create',
    '/1/update',
    '/1/delete',
))
def test_login_required(client, path):
    response = client.post(path)
    assert response.headers['Location'] == 'http://localhost/auth/login'





def test_delete(client, auth, app):
    auth.login()
    response = client.post('/1/delete')
    assert response.headers['Location'] == 'http://localhost/auth/login'

    with app.app_context():
        db = MySQL().connection.cursor()
        db.execute("SELECT * FROM Transactions WHERE id = 1")
        post = db.fetchone()
        assert post is None