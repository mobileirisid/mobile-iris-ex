import React, {PropTypes} from 'react';
import {Form, Modal, Message, Icon} from 'semantic-ui-react';

const AddSubscriber = ({show, onSubmit, error, loading, registeringEye}) => {

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

    const ModalTitle = (registeringEye) => {
        if (registeringEye) {
            return "Register iris for new subscriber";
        } else {
            return "Create a Subscriber";
        }
    }

    return (
        <div>
            <Modal trigger={show} size='small' dimmer={'inverted'} closeIcon={<Icon name={'close'} color={'blue'}/>}>
                <Modal.Header>
                    Create a Subscriber
                </Modal.Header>
                {ErrorMessage(error)}
                <Modal.Content>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Input
                            icon='phone'
                            iconPosition={'left'}
                            label='Phone Number'
                            name='phone_value'
                            placeholder='+x (xxx)-xxxx'/>
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
                        <Form.Button primary type='submit' fluid>Add Subscriber</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

AddSubscriber.propTypes = {
    show: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    registeringEye: PropTypes.bool
}

export default AddSubscriber;