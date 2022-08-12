import React, { useEffect } from 'react';

import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { useDispatch } from 'react-redux';
import { signInRequest } from './store/modules/auth/actions';
import { Provider as StoreProvider } from 'react-redux';
import { store, persistor } from './store';
import Home from './mvvm/views/Home';

function App() {
	return (
		<StoreProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Home />
			</PersistGate>
		</StoreProvider>
	);
}

export default App;
