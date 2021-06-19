import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'

const AuthRoutes = () => {

    return (
        <Switch>
            <Route exact path='/' component={SignIn} />
        </Switch>
    )

}

export default AuthRoutes
