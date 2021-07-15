import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Manager from '../pages/Manager'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'
import Championship from '../pages/Manager/Championship'
import Confrontation from '../pages/Manager/Championship/Eurocopa/Confrontation'
import Scores from '../pages/Manager/Championship/Eurocopa/Scores'
import Schendule from '../pages/Manager/Championship/Eurocopa/Schendule'
import RecoveryPage from '../pages/RecoveryPage'

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
            <CustomRoute isPrivate exact path='/' component={Manager} />
            <CustomRoute exact path='/sign-in' component={SignIn} />
            <CustomRoute exact path='/recovery/:token' component={RecoveryPage} />
            <CustomRoute exact path='/championship/:name/:id' component={Championship} />
            <CustomRoute exact path='/confrontation/:id' component={Confrontation} />
            <CustomRoute exact path='/scores/:id' component={Scores} />
            <CustomRoute exact path='/schendule/:id' component={Schendule} />
            <CustomRoute path='*' component={NotFound} />
        </Switch>
    )
}

export default Routes