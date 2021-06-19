import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ManagerHome from '../pages/Manager/ManagerHome'

const AppRoutes = () => {

    return (
        <Switch>
            <Route path='/' component={ManagerHome} />
        </Switch>
    )

}

export default AppRoutes
