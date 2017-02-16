import React, {Component} from 'react';
import CenteredColumn from '../components/CenterColumn';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    render () {
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredColumn>
                    <LoginForm onSubmit={()=>(console.log('nice'))}/>
                </CenteredColumn>
            </div>
        );
    }
}

export default Login