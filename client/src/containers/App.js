import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router'
import configureRoutes from '../routes';
import '../App.css';

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                {configureRoutes()}
            </Router>
        );     
    }
}

export default App;
