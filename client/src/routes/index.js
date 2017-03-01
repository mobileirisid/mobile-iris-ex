import React from 'react';
import {IndexRoute, Route} from 'react-router';
import SignupWithSubscriber from '../containers/SignupWithSubscriber';
import Login from '../containers/Login';
import Home from '../containers/HomePage';
import AuthenticatedContainer from '../containers/AuthenticatedContainer';
import * as persistence from '../utils/persistence';

export default function configureRoutes(store) {
    const ensureAuthenticated = (nextState, replace, cb) => {
        
        if (!persistence.getToken()) {
            replace('/signup');
        }

        cb();
    }
    return (
        <div>
            <Route>
                <IndexRoute component={SignupWithSubscriber} />
                <Route path='/signup' component={SignupWithSubscriber}/>
                <Route path='/login' component={Login}/>

                <Route path='/' component={AuthenticatedContainer} onEnter={ensureAuthenticated}>
                    <IndexRoute component={Home} />
                </Route>
            </Route>
        </div>
    )
}
