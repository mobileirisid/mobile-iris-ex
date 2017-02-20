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
                    icon='mail outline'
                    iconPosition={'left'}
                    label='Email'
                    name='email'
                    placeholder='xxxxx@xxx.com'/>
                <Form.Input
                    icon='phone'
                    iconPosition={'left'}
                    label='Phone Number'
                    name='phone-number'
                    placeholder='+x(xxx)-xxxx'/>
                <Form.Group widths='equal'>
                    <Form.Input
                        icon='user'
                        iconPosition={'left'}
                        label='First Name'
                        name='first_name'
                        placeholder='first name'/>
                    <Form.Input
                        icon='user'
                        iconPosition={'left'}
                        label='Last Name'
                        name='last_name'
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
                    name='verify_password'
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