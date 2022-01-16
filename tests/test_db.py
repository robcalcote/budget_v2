import sqlite3

import pytest

from flask_mysqldb import MySQL



def test_get_close_db(app):
    with app.app_context():
        db = MySQL().connection.cursor()
        assert db is MySQL().connection.cursor()

    with pytest.raises(sqlite3.ProgrammingError) as e:
        db.execute('SELECT 1')

    assert 'closed' in str(e.value)


def test_init_db_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    monkeypatch.setattr('budget.db.init_db', fake_init_db)
    result = runner.invoke(args=['init-db'])
    assert 'Initialized' in result.output
    assert Recorder.called