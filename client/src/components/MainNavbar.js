import React, {PropTypes} from 'react'
import {Menu, Button, Image, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router';
import acmePay from '../icons/acme.png';

const MainNavbar = ({selected, subscribers, onSelect, loading}) => {

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
        if (selected && selected.id) {
            return selected.firstName + " " + selected.lastName;
        } else {
            return "None Selected";
        }
    }

    return (
        <div>
            <Menu color='blue' inverted>
                <Menu.Item>
                    <Image src={acmePay} size={"small"}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Dropdown} text={selectedSubscriber()} loading={loading}>
                        <Dropdown.Menu>
                            {subs().map((s) => {
                                return <Dropdown.Item key={s.id} value={s.id} onClick={selectedItem}>
                                    <font>{`${s.firstName} - ${s.lastName}`}</font>
                                </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/login">
                            <Button inverted size='small'>
                                Logout
                            </Button>
                        </Link>
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
    loading: PropTypes.bool
}

export default MainNavbar