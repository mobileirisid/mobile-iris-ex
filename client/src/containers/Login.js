import React, {Component} from 'react';
import {connect} from 'react-redux';
import CenteredColumn from '../components/CenterColumn';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import LoginForm from '../components/LoginForm';
import {login} from '../redux/modules/'

class Login extends Component {
    render () {
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredColumn>
                    <LoginForm onSubmit={this.props.onSubmit} error={this.props.errorMessage}/>
                </CenteredColumn>
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