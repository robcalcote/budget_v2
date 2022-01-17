from budget import create_app

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

# WIP
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