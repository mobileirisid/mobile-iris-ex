import React, {PropTypes} from 'react'
import {Form, Header} from 'semantic-ui-react';

const SignupForm = ({onSubmit}) => {

    const handleSubmit = (e, {formData}) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div>
            <Header as='h2'>Register</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    icon='phone'
                    iconPosition={'left'}
                    label='Phone Number'
                    name='phoneNumber'
                    placeholder='+x(xxx)-xxxx'/>
                <Form.Group widths='equal'>
                    <Form.Input
                        icon='user'
                        iconPosition={'left'}
                        label='First Name'
                        name='firstName'
                        placeholder='first name'/>
                    <Form.Input
                        icon='user'
                        iconPosition={'left'}
                        label='Last Name'
                        name='lasName'
                        placeholder='last name'/>
                </Form.Group>
                <Form.Input
                    icon='privacy'
                    iconPosition={'left'}
                    label='Password'
                    name='password'
                    placeholder='password'
                    type='password'/>
                <Form.Input
                    icon='privacy'
                    iconPosition={'left'}
                    label='Verify Password'
                    name='verifyPassword'
                    placeholder='password'
                    type='password'/>
                <Form.Button primary type='submit'>Signup</Form.Button>
            </Form>
        </div>
    );
}

SignupForm.propType = {
    onSubmit: PropTypes.object.isRequired
}

export default SignupForm