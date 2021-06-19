import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AuthProvider from './contexts/AuthContext'
import Routes from './routes'

const App = () => {

	return (
		<BrowserRouter>

			<AuthProvider>

				<Routes />

			</AuthProvider>

		</BrowserRouter>
	);
}

export default App;
