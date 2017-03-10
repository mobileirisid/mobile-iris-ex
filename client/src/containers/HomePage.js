import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react';
import MainContent from '../components/MainContent';
import ValidateButtons from '../components/ValidateButtons/index';
import {requestValidation, cancelCheck, checkIfValidated} from '../redux/modules/irisValidation';

class HomePage extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldPoll) {
            const check = () => this.props.checkIfValidated(nextProps.checkId, nextProps.count);
            setTimeout(check, 2000);
        }

        if (nextProps.maxedOut) {
            this.props.cancelCheck(
                this.props.subscriber.id,
                this.props.phones[0].id
            );
        }
    }
    
    enabled() {
        const {subscriber} = this.props;
        if (subscriber && subscriber.id) {
            return true;
        } else {
            return false;
        }
    } 

    requestCheck() {
        this.props.onValidate(
            this.props.subscriber.id,
            this.props.phones[0].id
        );
    }

    cancel() {
        this.props.onCancel(
            this.props.subscriber.id,
            this.props.phones[0].id
        );
    }

    render() {
        return (
            <div>
                <Segment attached>
                    <MainContent/>
                </Segment>
                <ValidateButtons
                    onClick={this.requestCheck.bind(this)}
                    onCancel={this.cancel.bind(this)}
                    loading={this.props.loading}
                    enabled={this.enabled()}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {    
    return {
        loading: state.irisValidation.loading,
        subscriber: state.account.currentSubscriber,
        phones: state.account.currentSubscriberPhones,
        shouldPoll: state.irisValidation.shouldPoll,
        checkId: state.irisValidation.checkId,
        count: state.irisValidation.count,
        maxedOut: state.irisValidation.maxedOut,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onValidate: (sub_id, phone_id) => {                         
            dispatch(requestValidation(sub_id, phone_id));
        },
        onCancel: (sub_id, phone_id) => {
            dispatch(cancelCheck(sub_id, phone_id));
        },
        checkIfValidated: (checkId, count) => {
            dispatch(checkIfValidated(checkId, count));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)