import React, {PropTypes} from 'react'
import {Button} from 'semantic-ui-react'
import './styles.css'

const ValidateButtons = ({onClick, onCancel, loading}) => {
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
                attached={'bottom'}>
                Validate Identity and Send Money
            </Button>
        </div>
    )
}

ValidateButtons.propTypes = {
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool
}

export default ValidateButtons