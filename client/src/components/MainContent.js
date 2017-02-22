import React from 'react';
import {Grid, Segment, Image, Header} from 'semantic-ui-react';
import personOne from '../icons/person1.png';
import personTwo from '../icons/person2.png';
import grayArrow from '../icons/arrow_gray.png';

const MainContent = () => {
    return (
        <div>
            <Grid columns={3} centered>
                <Grid.Row>
                    <Grid.Column>
                        <Image src={personOne} floated='right'/>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={grayArrow} size='tiny' centered/>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={personTwo} floated='left'/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Header as='h3'>
                        You are sending money to Heather Williams
                        <Header.Subheader>
                            We'll notify them with a text on your behalf
                        </Header.Subheader>
                    </Header>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default MainContent