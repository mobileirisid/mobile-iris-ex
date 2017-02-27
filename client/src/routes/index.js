import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import Home from '../containers/HomePage';
import AuthenticatedContainer from '../containers/AuthenticatedContainer';
import * as persistence from '../utils/persistence';

export default function configureRoutes(store) {
    const ensureAuthenticated = (nextState, replace, cb) => {
        // const {dispatch} = store;
        // const {session} = store.getState();
        // const {currentUser} = session;
        if (!persistence.getToken()) {
            replace('/signup');
        }

        cb();
    }
    return (
        <div>
            <Route>
                <IndexRoute component={Signup} />
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>

                <Route path='/' component={AuthenticatedContainer} onEnter={ensureAuthenticated}>
                    <IndexRoute component={Home} />
                </Route>
            </Route>
        </div>
    )
}
