import React, {Component} from 'react';
import {connect} from 'react-redux';
import CenteredFormContainer from '../components/CenteredFormContainer';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import SignupForm from '../components/SignupForm';
import {signup} from '../redux/modules/signup';

class Signup extends Component {
    render () {
        const {errorMessage, loading} = this.props;
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredFormContainer>
                    <SignupForm onSubmit={this.props.onSubmit} error={errorMessage} loading={loading}/>
                </CenteredFormContainer>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        errorMessage: state.signup.errorMessage,
        loading: state.signup.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (data) => {
            dispatch(signup(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);