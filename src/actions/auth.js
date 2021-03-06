

import Swal from 'sweetalert2';
import { startLoading, finishLoading, setUnknownUser, removeError } from '../actions/ui';
import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        //start
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( {user} )  => {

                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
                dispatch( removeError() );
                console.log(user);

                
            })
            .catch( e => {
                console.log(e);
                dispatch( setUnknownUser(e.message) );
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

            
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async( {user} )  => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                )
                console.log(user);
                //console.log("CREED",userCred);
                // dispatch(
                //     login( user.uid, user.displayName )
                // )
                
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');

            })

    }

}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ( {user} )  => {
                //console.log("CREED",userCred);
                dispatch(
                    login( user.uid, user.displayName )
                )
                
            })

    }

}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})