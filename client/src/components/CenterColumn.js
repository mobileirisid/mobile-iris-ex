import React, {Component} from 'react';
import {Grid, Segment} from 'semantic-ui-react';

class CenterColumn extends Component {
    render() {
        return (
            <div>
                <Grid container centered columns='equal'>
                    <Grid.Column width={8}>
                        {this.props.children}                        
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default CenterColumn