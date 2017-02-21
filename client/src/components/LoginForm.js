import React, {PropTypes} from 'react'
import {Form, Header, Message} from 'semantic-ui-react';

const LoginForm = ({onSubmit, error}) => {

    const handleSubmit = (e, {formData}) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const ErrorMessage = (error) => {
        if (error) {
            return (
                <Message error header='Unable to Sign up to do following errors' content={error}/>
            );
        }
    }

    return (
        <div>
            <Header as='h2'>Login</Header>
            {ErrorMessage(error)}
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    icon='phone'
                    iconPosition={'left'}
                    label='Phone Number'
                    name='phone_number'
                    placeholder='+x(xxx)-xxxx'/>                                
                <Form.Input
                    icon='privacy'
                    iconPosition={'left'}
                    label='Password'
                    name='password'
                    placeholder='password'
                    type='password'/>
                <Form.Button primary type='submit'>Login</Form.Button>
            </Form>
        </div>
    );
}

LoginForm.propType = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default LoginForm