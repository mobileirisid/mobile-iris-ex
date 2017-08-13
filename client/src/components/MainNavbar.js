import React, {PropTypes} from 'react'
import {Menu, Image, Dropdown} from 'semantic-ui-react';
import acmePay from '../icons/acme.png';

const MainNavbar = ({
    selected,
    subscribers,
    onSelect,
    onLogout,
    loading,
    addSubscriber
}) => {

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
            return "Select a subscriber";
        }
    }

    return (
        <div>
            <Menu color='blue' inverted stackable>
                <Menu.Item>
                    <Image src={acmePay} size={"small"}/>
                </Menu.Item>
                <Menu.Item content={addSubscriber} />
                <Menu.Item as={Dropdown} text={selectedSubscriber()} loading={loading}>
                    <Dropdown.Menu>
                        {subs().filter((s) => s.phones.length > 0).map((s) => {
                            return (
                                <Dropdown.Item key={s.id} value={s.id} onClick={selectedItem}>
                                    <font>{s.firstName}&nbsp; {s.lastName} - {s.phones[0].value}</font>
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Menu.Item>
                <Menu.Item onClick={onLogout} content="Logout" />
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