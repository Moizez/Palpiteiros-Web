import React from 'react'
import { BrowserRouter , useHistory} from 'react-router-dom'
import './App.css'

import { Body } from './globalStyles'
import AuthProvider from './contexts/AuthContext'
import ToolBar from './components/MaterialUi/ToolBar'
import Routes from './routes'

const App = () => {

	const history = useHistory()

	return (
		<BrowserRouter>

			<AuthProvider>
		
				<ToolBar />

				<Body>

					<Routes />
					
				</Body>

			</AuthProvider>

		</BrowserRouter>
	);
}

export default App;
