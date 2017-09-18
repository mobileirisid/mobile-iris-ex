import React, {Component} from 'react'
import {connect} from 'react-redux';
import CenterColumn from '../components/CenterColumn';
import MainNavbar from '../components/MainNavbar';
import {fetchSubscribers, selectSubscriber} from '../redux/modules/account';
import {logout} from '../redux/modules/session';
import AddSubscriber from './AddSubscriberContainer';
import {requestRegistration} from '../redux/modules/irisValidation';

class AuthenticatedContainer extends Component {

    componentDidMount() {
        this
            .props
            .fetchSubscribers();
    }

    render() {
        const {selectedSubscriber} = this.props;
        const {selectedPhoneId} = this.props;
        const {subscribers} = this.props;
        const {onSelect} = this.props;
        const {logout} = this.props;
        const {loading} = this.props;
        const {error} = this.props;
        const {requestRegistration} = this.props;

        const subscriberModal = (<AddSubscriber />);

        return (
            <div>
                <MainNavbar
                    selected={selectedSubscriber}
                    selectedPhone={selectedPhoneId}
                    subscribers={subscribers}
                    onSelect={onSelect}
                    onLogout={logout}
                    loading={loading}
                    addSubscriber={subscriberModal}
                    register={requestRegistration}/>
                <CenterColumn>
                    {this.props.children}
                </CenterColumn>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subscribers: state.account.subscribers,
        selectedSubscriber: state.account.currentSubscriber,
        selectedPhoneId: state.account.selectedPhoneId,
        loading: state.account.loading,
        error: state.account.error
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelect: (subscriber, phoneId) => {
            dispatch(selectSubscriber(subscriber, phoneId));
        },
        fetchSubscribers: () => {
            dispatch(fetchSubscribers());
        },
        requestRegistration: (sub_id, phone_id) => {
            dispatch(requestRegistration(sub_id, phone_id));
        },
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)