import React, { PropTypes } from 'react'
import { Form, Header, Message, Icon } from 'semantic-ui-react';

const SignupForm = ({ onSubmit, error, loading }) => {

    const handleSubmit = (e, { formData }) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const ErrorMessage = (error) => {
        if (error) {
            return (
                <Message error header='Unable to Sign up to do following errors' content={error} />
            )
        };
    }

    return (
        <div>
            <Segment raised padded textAlign={'left'}>
                <Header as='h2'>Register</Header>
                {ErrorMessage(error)}
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Input
                        icon='mail outline'
                        iconPosition={'left'}
                        label='Email'
                        name='email'
                        placeholder='xxxxx@xxx.com' />
                    <Form.Input
                        icon='privacy'
                        iconPosition={'left'}
                        label='Password'
                        name='password'
                        placeholder='password'
                        type='password' />
                    <Form.Input
                        icon='privacy'
                        iconPosition={'left'}
                        label='Verify Password'
                        name='verify_password'
                        placeholder='password'
                        type='password' />
                    <Form.Button primary type='submit'>Signup</Form.Button>
                </Form>
            </Segment>
            <Message attached='bottom' warning>
                <Icon name='help' />
                Already have an account? &nbsp;<Link to='/login'>Login here</Link>&nbsp;
            </Message>
        </div>
    );
}

SignupForm.propType = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
}

export default SignupForm