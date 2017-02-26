import React, {Component} from 'react'
import {Segment, Grid} from 'semantic-ui-react'

class CenteredFormContainer extends Component {
    render() {
        return (
            <div>
                <Grid container centered columns='equal'>
                    <Grid.Column width={8}>
                        <Segment raised padded textAlign={'left'}>
                            {this.props.children}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default CenteredFormContainer