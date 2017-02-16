import React, {Component} from 'react';
import CenteredColumn from '../components/CenterColumn';
import LoginSignupNavbar from '../components/LoginSignupNavbar';
import SignupForm from '../components/SignupForm';

class Signup extends Component {
    render () {
        return (
            <div>
                <LoginSignupNavbar/>
                <CenteredColumn>
                    <SignupForm onSubmit={()=>(console.log('nice'))}/>
                </CenteredColumn>
            </div>
        )
    }
}

export default Signup