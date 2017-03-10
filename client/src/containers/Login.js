import React, {Component} from 'react';
import {connect} from 'react-redux';
import CenteredFormContainer from '../components/CenteredFormContainer';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import LoginForm from '../components/LoginForm';
import {login} from '../redux/modules/session';

class Login extends Component {
    render () {
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredFormContainer>
                    <LoginForm onSubmit={this.props.onSubmit} error={this.props.errorMessage}/>
                </CenteredFormContainer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        errorMessage: state.session.errorMessage
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (data) => {
            dispatch(login(data)); 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)