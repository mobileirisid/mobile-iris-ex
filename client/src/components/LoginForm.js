import React, {PropTypes} from 'react'
import {Form, Header} from 'semantic-ui-react';

const LoginForm = ({onSubmit}) => {

    const handleSubmit = (e, {formData}) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div>
            <Header as='h2'>Login</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    icon='phone'
                    iconPosition={'left'}
                    label='Phone Number'
                    name='phoneNumber'
                    placeholder='+x(xxx)-xxxx'/>                                
                <Form.Input
                    icon='privacy'
                    iconPosition={'left'}
                    label='Verify Password'
                    name='verifyPassword'
                    placeholder='password'
                    type='password'/>
                <Form.Button primary type='submit'>Login</Form.Button>
            </Form>
        </div>
    );
}

LoginForm.propType = {
    onSubmit: PropTypes.object.isRequired
}

export default LoginForm