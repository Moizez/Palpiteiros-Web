import { useEffect } from 'react';
import logo from '../../../src/logo.svg';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('entrou aqui');

		return () => {
			console.log('return');
			dispatch(
				signInRequest({
					email: 'augusto@hotmail.com',
					password: '123',
				})
			);
		};
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
};

export default Home;
