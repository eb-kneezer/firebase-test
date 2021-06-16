import React from 'react'

import {WithFirebase} from '../Firebase'

const SignOutButton = ({firebase}) => (
    <button type='button' onClick={firebase.doSignOut}>
        Sign Out
    </button>
)

export default WithFirebase(SignOutButton);