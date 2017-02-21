import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router'
import configureRoutes from '../routes';
import '../App.css';

class App extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    {configureRoutes(this.props.store)}
                </Router>
            </Provider>
        );
    }
}

export default App;
