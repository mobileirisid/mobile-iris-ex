import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addSubscriber} from '../redux/modules/account';
import AddSubscriber from '../components/Subscribers/AddSubscriber';
import {checkIfIrisRegistered} from '../redux/modules/irisValidation';

class AddSubscriberContainer extends Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)

        if (nextProps.shouldPollReg) {            
            const check = () => this
                .props
                .checkIfRegistered(nextProps.regCheckId, nextProps.count);
            setTimeout(check, 2000);
        }

        if (nextProps.maxedOutReg) {
            this
                .props
                .cancelCheck(this.props.subscriber.id, this.props.phones[0].id);
        }
    }

    render() {

        const renderButton = (
            <div style={{cursor: "pointer"}}>
                Add Subscriber
            </div>
        );

        const {loading} = this.props;
        const {shouldPollReg} = this.props;
        const {addSubscriber} = this.props;
        const {error} = this.props;

        return (
            <AddSubscriber
                onSubmit={addSubscriber}
                show={renderButton}
                error={error}
                loading={loading}
                registeringEye={shouldPollReg} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.account.loading,
        error: state.account.error,
        irisRegistration: state.irisValidation.shouldPollReg,
        regCheckId: state.irisValidation.regCheckId
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addSubscriber: (data) => {
            dispatch(addSubscriber(data));
        },
        checkIfRegistered: (id, count) => {
            dispatch(checkIfIrisRegistered(id, count));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubscriberContainer);