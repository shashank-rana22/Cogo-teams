import '../theme/index.css';
import { Provider } from 'react-redux';
import useSWR, { SWRConfig } from 'swr';

import store from '../../store';
import Layout from '../Layout';

function MyApp({ Component, pageProps }) {
	return (
		<SWRConfig value={{ provider: () => new Map() }}>
			<Provider store={store}>

				<Layout layout={pageProps.layout || 'authenticated'}>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</SWRConfig>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const {
		store, req, pathname, asPath, query = {},
	} = ctx;
	const isServer = typeof req !== 'undefined';

	const pathPrefix = '/[partner_id]';

	const ctxParams = {
		...ctx,
		isServer,
		pathPrefix,
	};

	const unPrefixedPath = `/${asPath.split('/').slice(2).join('/')}`;

	// const { asPrefix, query: qError } = await handleAuthentication(ctxParams);

	const initialProps = Component.getInitialProps
		? await Component.getInitialProps(ctxParams)
		: {};

	return {
		pageProps: { ...(initialProps || {}) },
		pathname,
		asPath,
	};
};

export default MyApp;
