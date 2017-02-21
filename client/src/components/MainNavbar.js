import React, {Component} from 'react'
import {Menu, Button, Image} from 'semantic-ui-react';
import {Link} from 'react-router';
import acmePay from '../icons/acme.png';

const MainNavbar = () => {
    return (
        <div>
            <Menu color='blue' inverted>
                <Menu.Item>
                    <Image src={acmePay} size={"small"}/>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MainNavbar