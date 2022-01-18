import React from 'react'
import Form from './Form';

const Login = ({ firebase, auth, loggedIn }) => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            {loggedIn ? <Form /> : <div className="sign-in-container">
                <button onClick={signInWithGoogle} type="button" className="sign-in" >
                    Sign in with Google
                </button>
            </div>}
        </>
    )
}
export default Login
