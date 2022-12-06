import '@cogoport/components/dist/themes/supernova.css';
import { Provider } from 'react-redux';

import store from '../../store';
import Layout from '../Layout';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
