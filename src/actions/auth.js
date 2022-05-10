import { types } from '../types/types';
import { startLoading, finishLoading } from '../actions/ui';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        //start
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( {user} )  => {
                dispatch( login( user.uid, user.displayName ) );
                
                dispatch( finishLoading() );
                console.log(user);
                
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
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