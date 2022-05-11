import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import firebase from "firebase/app";
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [ checking, setchecking ] = useState(true);

    const [ isLoggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( (user) => {

            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }

            setchecking(false);

        })

    },[ dispatch, setchecking, setLoggedIn ]);

    if( checking ) {
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
