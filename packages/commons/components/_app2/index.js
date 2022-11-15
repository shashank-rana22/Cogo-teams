import { Provider } from 'react-redux';

import store from '../../store';

function MyApp2({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp2;
