import Layout from './Layout';
import {Provider} from "react-redux"
import {default as Store} from "../../store"
function MyApp({ Component, pageProps }) {
	return (
		<Provider store={Store}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
		</Provider>
	);
}

export default MyApp;
