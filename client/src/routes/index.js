import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Signup from '../containers/Signup';
import Login from '../containers/Login';

export default function configureRoutes() {
    return (
        <div>
            <Route>
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
            </Route>
        </div>
    )
}
