import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ManagerHome from '../pages/Manager/ManagerHome'
import NotFound from '../pages/NotFound'

const Routess = () => {

    return (
        <Switch>
            <Route exact path='/home' component={ManagerHome} />
            <Route exact path='*' component={NotFound} />
        </Switch>
    )

}

export default Routess
