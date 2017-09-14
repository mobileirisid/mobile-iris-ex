import React from 'react'
import {Grid, Image, Header, Divider} from 'semantic-ui-react'
import personOne from '../icons/person1.png'
import personTwo from '../icons/person2.png'
import grayArrow from '../icons/arrow_gray.png'
import appIcon from '../icons/appicon.png'

const MainContent = () => {
    return (
        <div>
            <Grid columns={3} centered>
                <Grid.Row columns='equal'>
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
                            <br/>
                            We'll notify them with a text on your behalf
                        </Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Header as='h2' size='huge'>
                        $15,000.00
                        <Header.Subheader size='small'>
                            $12,867.74 Balance
                        </Header.Subheader>
                    </Header>
                </Grid.Row>
                <Divider fitted></Divider>
                <Grid.Row>
                    <Grid verticalAlign={'middle'} container>
                        <Grid.Column width={3}>
                            <Grid.Row>
                                <Image src={appIcon} size={'medium'}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Header as="h4" textAlign={'left'}>MobileIrisID security is
                                automatically enabled for transactions over $1000.
                                <a> Learn More</a>
                            </Header>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default MainContent