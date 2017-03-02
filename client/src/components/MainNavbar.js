import React, {PropTypes} from 'react'
import {Menu, Button, Image, Dropdown} from 'semantic-ui-react';
import acmePay from '../icons/acme.png';

const MainNavbar = ({selected, subscribers, onSelect, onLogout, loading, addSubscriber}) => {

    const selectedItem = (e, item) => {
        onSelect(subscribers.find(val => val.id === item.value));
    }

    const subs = () => {
        if (subscribers) {
            return subscribers;
        } else {
            return []
        }
    }

    const selectedSubscriber = () => {
        if (loading) {
            return "";
        }

        if (selected && selected.id) {
            return selected.firstName + " " + selected.lastName;
        } else {
            return "Add or select a subscriber";
        }
    }

    return (
        <div>
            <Menu color='blue' inverted>
                <Menu.Item>
                    <Image src={acmePay} size={"small"}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        {addSubscriber}                        
                    </Menu.Item>
                    <Menu.Item as={Dropdown} text={selectedSubscriber()} loading={loading}>
                        <Dropdown.Menu>
                            {subs().map((s) => {
                                return <Dropdown.Item key={s.id} value={s.id} onClick={selectedItem}>
                                    <font>{`${s.firstName} ${s.lastName}`}</font>
                                </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <Button inverted size='small' onClick={onLogout}>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}

MainNavbar.propType = {
    current: PropTypes.object,
    subscribers: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    addSubscriber: PropTypes.object,
    loading: PropTypes.bool
}

export default MainNavbar