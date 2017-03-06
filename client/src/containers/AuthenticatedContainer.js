import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';
import CenterColumn from '../components/CenterColumn';
import MainNavbar from '../components/MainNavbar';
import {fetchSubscribers, selectSubscriber, addSubscriber} from '../redux/modules/account';
import {logout} from '../redux/modules/session';
import AddSubscriber from '../components/Subscribers/AddSubscriber';

class AuthenticatedContainer extends Component {

    componentDidMount() {
        this
            .props
            .fetchSubscribers();
    }

    render() {
        const {selectedSubscriber} = this.props;
        const {subscribers} = this.props;
        const {onSelect} = this.props;
        const {logout} = this.props;
        const {loading} = this.props;
        const {addSubscriber} = this.props;
        const {error} = this.props;

        const renderButton = (
            <Button inverted size='small'>
                Add Subscriber
            </Button>
        );

        const subscriberModal = (<AddSubscriber
            onSubmit={addSubscriber}
            show={renderButton}
            error={error}
            loading={loading}/>);

        return (
            <div>
                <MainNavbar
                    selected={selectedSubscriber}
                    subscribers={subscribers}
                    onSelect={onSelect}
                    onLogout={logout}
                    loading={loading}
                    addSubscriber={subscriberModal}/>
                <CenterColumn>
                    {this.props.children}
                </CenterColumn>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {subscribers: state.account.subscribers, selectedSubscriber: state.account.currentSubscriber, loading: state.account.loading, error: state.account.error}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelect: (subscriber) => {
            dispatch(selectSubscriber(subscriber));
        },
        addSubscriber: (data) => {
            dispatch(addSubscriber(data));
        },
        fetchSubscribers: () => {
            dispatch(fetchSubscribers());
        },
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)