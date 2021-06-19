import React, { useContext } from 'react'
import {Redirect} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes = () => {
    const { signed } = useContext(AuthContext)

    return (
        signed ? <AppRoutes /> : <AuthRoutes  />
    )
}

export default Routes