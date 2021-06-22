import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ManagerHome from '../pages/Manager/ManagerHome'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'
import Jackpot from '../pages/Manager/Championships/Eurocopa/Jackpot'

import { isLogged } from './auth'

const CustomRoute = ({ isPrivate, ...rest }) => {

    const logged = isLogged()

    if (isPrivate && !logged) {
        return <Redirect to='/sign-in' />
    } else {
        return <Route {...rest} />
    }
}

const Routes = () => {

    return (
        <Switch>
            <CustomRoute isPrivate exact path='/' component={ManagerHome} />
            <CustomRoute exact path='/sign-in' component={SignIn} />
            <CustomRoute exact path='/jackpot/:id' component={Jackpot} />
            <CustomRoute path='*' component={NotFound} />
        </Switch>
    )
}

export default Routes