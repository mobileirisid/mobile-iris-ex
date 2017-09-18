import React, { PropTypes } from "react";
import { Menu, Image, Dropdown, Button } from "semantic-ui-react";

const MainNavbar = ({
	selected,
	subscribers,
	onSelect,
	onLogout,
	loading,
	addSubscriber,
	register
}) => {
	const selectedItem = (e, item) => {
		onSelect(subscribers.find(val => val.id === item.value));
	};

	const subs = () => {
		if (subscribers) {
			return subscribers;
		} else {
			return [];
		}
	};

	const selectedSubscriber = () => {
		if (loading) {
			return "";
		}

		if (selected && selected.id) {
			return selected.firstName + " " + selected.lastName;
		} else {
			return "Select a subscriber";
		}
	};

	const registerSub = (subscriber_id, phone_id) => {
		return () => register(subscriber_id, phone_id);
	};

	return (
		<div>
			<Menu color="blue" inverted stackable>
				<Menu.Item>
					<h2>Payments</h2>
				</Menu.Item>
				<Menu.Item content={addSubscriber} />
				<Menu.Item as={Dropdown} text={selectedSubscriber()} loading={loading}>
					<Dropdown.Menu>
						{subs()
							.filter(s => s.phones.length > 0)
							.map(s => {
								if (s.guid === undefined) {
									const items = s.phones.map(phone => {
										return (
											<Dropdown.Item
												key={phone.id}
												value={phone.id}
												onClick={selectedItem}>
												{phone.value}&nbsp;
												<Button
													color="blue"
													size="small"
													onClick={registerSub(s.id, phone.id)}>
													{" "}
													Register
												</Button>
											</Dropdown.Item>
										);
									});
									return [
										<Dropdown.Header>
											{s.firstName}&nbsp; {s.lastName}
										</Dropdown.Header>,
										items,
                                        <Dropdown.Divider />,
									];
								} else {
									const items = s.phones.map(phone => {
										return (
											<Dropdown.Item
												key={phone.id}
												value={phone.id}
												onClick={selectedItem}>
												{phone.value}&nbsp;
											</Dropdown.Item>
										);
									});
									return [
										<Dropdown.Header>
											{s.firstName}&nbsp; {s.lastName}
										</Dropdown.Header>,
										items,
                                        <Dropdown.Divider />,
									];
								}
							})}
					</Dropdown.Menu>
				</Menu.Item>
				<Menu.Item onClick={onLogout} content="Logout" />
			</Menu>
		</div>
	);
};

MainNavbar.propType = {
	current: PropTypes.object,
	subscribers: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
	addSubscriber: PropTypes.object,
	loading: PropTypes.bool,
	register: PropTypes.func
};

export default MainNavbar;
