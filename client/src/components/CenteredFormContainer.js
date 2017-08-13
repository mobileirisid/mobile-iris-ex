import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class CenteredFormContainer extends Component {
    render() {
        return (
            <div>
                <Grid container centered columns='equal'>
                    <Grid.Column mobile={16} computer={8}>
                        {this.props.children}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default CenteredFormContainer