import React, {PropTypes} from 'react'
import {Button} from 'semantic-ui-react'
import './styles.css'

const ValidateButtons = ({onClick, onCancel, loading, enabled}) => {
    const text = (enabled) => {
        if (enabled) {
            return "Validate Identity and Send Money";
        } else {
            return "Select a subscriber to validate";
        }
    }

    if (loading) {        
        return (
            <Button.Group vertical className='bttnGrp'>
                <Button className='mainButton' inverted size='huge' disabled loading fluid>
                    Validate Identity and Send Money
                </Button>
                <Button
                    color='red'
                    size='huge'
                    onClick={onCancel}>
                    Cancel
                </Button>
            </Button.Group>
        )
    }
    return (
        <div>
            <Button
                className='mainButton'
                size={'huge'}
                inverted
                onClick={onClick}
                attached={'bottom'}
                disabled={!enabled}>
                {text(enabled)}
            </Button>
        </div>
    )
}

ValidateButtons.propTypes = {
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    enabled: PropTypes.bool
}

export default ValidateButtons