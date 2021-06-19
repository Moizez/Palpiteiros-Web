import React from 'react'
import { Router } from 'react-router-dom'
import './App.css'

import { Body } from './globalStyles'
import AuthProvider from './contexts/AuthContext'
import ToolBar from './components/MaterialUi/ToolBar'
import history from './routes/history'
import Routes from './routes'
import Footer from './components/Footer'
import { isLogged } from './routes/auth'

const App = () => {

	const logged = isLogged()

	return (

		<AuthProvider>

			{logged ? <ToolBar /> : null}

			<Body>

				<Router history={history}>

					<Routes />

				</Router>



			</Body>

			{logged ? <Footer /> : null}

		</AuthProvider>

	);
}

export default App;
