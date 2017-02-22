import React, {Component, PropTypes} from 'react'
import {Menu, Button, Image, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router';
import acmePay from '../icons/acme.png';

const MainNavbar = ({subscribers, onClick}) => {
    const subs = () => {
        if (subscribers) {
            return subscribers;
        } else {
            return [] 
        }
    }

    return (
        <div>
            <Menu color='blue' inverted>
                <Menu.Item>
                    <Image src={acmePay} size={"small"}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Dropdown} text={'hello'}>
                        <Dropdown.Menu>
                            {
                            subs().map((s) => {
                                return <Dropdown.Item
                                    key={s.id}
                                    value={s.id}
                                    onClick={onClick}>
                                    <font>{`${s.firstName} ${s.lastName}`}</font>
                                </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}

MainNavbar.propType = {
    subscribers: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default MainNavbar