import React from 'react'
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router';

const LoginSignupNavbar = () => {
    return (
        <div>
            <Menu color='blue' inverted stackable>
                <Menu.Item>
                    <Link to="/login">
                        Login
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/signup">
                        Signup
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LoginSignupNavbar