import React, {PropTypes} from 'react';
import {Form, Modal, Message, Segment, Head} from 'semantic-ui-react';

const AddSubscriber = ({show, onSubmit, error}) => {

    const handleSubmit = (e, {formData}) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const ErrorMessage = (error) => {
        if (error) {
            return (<Message
                error
                header='Unable to Create Subscriber do to following errors'
                content={error}/>)
        };
    }

    return (
        <div>
            <Modal trigger={show} size='small'>
                    <Modal.Header>
                        Create a Subscriber
                    </Modal.Header>
                    {ErrorMessage(error)}
                    <Modal.Content>
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
                    </Modal.Content>
            </Modal>
        </div>
    )
}

AddSubscriber.propTypes = {
    show: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default AddSubscriber;