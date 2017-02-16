import React from 'react'
import {Menu, Button} from 'semantic-ui-react';
import {Link} from 'react-router';

const LoginSignupNavbar = () => {
    return (
        <div>
            <Menu color='blue' inverted>
                <Menu.Item position='right'>
                    <Link to="/login">
                        <Button inverted size='small'>
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button inverted size='small'>
                            Signup
                        </Button>
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LoginSignupNavbar