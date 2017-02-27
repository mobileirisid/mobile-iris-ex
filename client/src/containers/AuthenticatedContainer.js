import React, {Component} from 'react'
import {connect} from 'react-redux';
import CenterColumn from '../components/CenterColumn';
import MainNavbar from '../components/MainNavbar';
import {fetchSubscribers, selectSubscriber} from '../redux/modules/account';

class AuthenticatedContainer extends Component {

    componentDidMount() {
        this.props.fetchSubscribers();
    }

    render() {
        const {selectedSubscriber} = this.props;
        const {subscribers} = this.props;
        const {onSelect} = this.props;
        const {loading} = this.props;

        return (
            <div>
                <MainNavbar selected={selectedSubscriber} subscribers={subscribers} onSelect={onSelect} loading={loading}/>
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
        loading: state.account.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelect: (subscriber) => {
            dispatch(selectSubscriber(subscriber));
        },
        fetchSubscribers: () => {
            dispatch(fetchSubscribers());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)