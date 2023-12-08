import React, { useEffect, useState } from 'react'
import {signInWithGoogle, auth, signOutUser} from '../../firebase'

function Register() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogIn = () => {
        signInWithGoogle()
    }
    const handleLogOut = () => {
        signOutUser()
    }
  return (
    <div>
        {!user?<button onClick={handleLogIn} className='log login'>Log in</button>:<button onClick={handleLogOut} className='log logout'>Log out</button>}
    </div>
  )
}

export default Register