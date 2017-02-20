import React, {Component} from 'react';
import {connect} from 'react-redux';
import CenteredColumn from '../components/CenterColumn';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import SignupForm from '../components/SignupForm';
import {signup} from '../redux/modules/signup';

class Signup extends Component {
    render () {
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredColumn>
                    <SignupForm onSubmit={this.props.onSubmit}/>
                </CenteredColumn>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
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