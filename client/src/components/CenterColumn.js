import React, {Component} from 'react';
import {Grid, Segment} from 'semantic-ui-react';

class CenterColumn extends Component {
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
        );
    }
}

export default CenterColumn