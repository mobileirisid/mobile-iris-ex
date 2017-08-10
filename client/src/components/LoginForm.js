import React, { PropTypes } from 'react'
import { Link } from 'react-router';
import { Form, Segment, Header, Message, Icon } from 'semantic-ui-react';

const LoginForm = ({ onSubmit, error }) => {

    const handleSubmit = (e, { formData }) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const ErrorMessage = (error) => {
        if (error) {
            return (
                <Message error header='Unable to Sign up to do following errors' content={error} />
            );
        }
    }

    return (
        <div>
            <Segment raised padded textAlign={'left'}>
                <Header as='h2'>Login</Header>
                {ErrorMessage(error)}
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        icon='mail'
                        iconPosition={'left'}
                        label='Email'
                        name='email'
                        placeholder='xxxx@xxxx.com' />
                    <Form.Input
                        icon='privacy'
                        iconPosition={'left'}
                        label='Password'
                        name='password'
                        placeholder='password'
                        type='password' />
                    <Form.Button primary type='submit'>Login</Form.Button>
                </Form>
            </Segment>
            <Message attached='bottom' warning>
                <Icon name='help' />
                Don't have an account? &nbsp;<Link to='/signup'>Sign Up Here</Link>&nbsp;
            </Message>
        </div>
    );
}

LoginForm.propType = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default LoginForm