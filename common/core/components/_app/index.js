import '@cogoport/components/dist/themes/supernova.css';
import handleAuthentication from '@cogoport/authentication/utils/handleAuthentication';
import { Router, RoutesProvider } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import Layout from './layout';

function MyApp({
	Component, pageProps, pathPrefix, asPrefix, query,
}) {
	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			pageProgessBar.start();
			pageProgessBar.set(0.4);
		});

		Router.events.on('routeChangeComplete', () => {
			pageProgessBar.done();
		});
	}, []);

	return (
		<SWRConfig value={{
			provider : () => new Map(),
			suspense : true,
			fallback : { 'https://api.github.com/repos/vercel/swr': null },
		}}
		>
			<Provider store={store}>
				<RoutesProvider config={{ pathPrefix, asPrefix, query }}>
					<title>Admin | Cogoport</title>
					<Layout layout={pageProps.layout || 'authenticated'}>
						<Component {...pageProps} />
					</Layout>
				</RoutesProvider>
			</Provider>
		</SWRConfig>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const {
		req, pathname, asPath, query,
	} = ctx;
	const isServer = typeof req !== 'undefined';
	const pathPrefix = '/[partner_id]';

	const ctxParams = {
		...ctx,
		store,
		isServer,
		pathPrefix,
	};

	const { asPrefix } = await handleAuthentication(ctxParams);

	const initialProps = Component.getInitialProps
		? await Component.getInitialProps(ctxParams)
		: {};

	return {
		pageProps: { ...(initialProps || {}) },
		pathname,
		pathPrefix,
		asPrefix,
		asPath,
		query,
	};
};

export default MyApp;
