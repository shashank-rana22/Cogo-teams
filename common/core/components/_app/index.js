import '@cogoport/components/dist/themes/dawn.css';
import handleAuthentication from '@cogoport/authentication/utils/handleAuthentication';
import { Router, RoutesProvider } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import { setGeneralState } from '@cogoport/store/reducers/general';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import Layout from './layout';

const isServer = typeof window === 'undefined';

if (!isServer) {
	// eslint-disable-next-line no-underscore-dangle
	window.__COGO_APP_STORE__ = store;
}

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
	const pathPrefix = '/[partner_id]';

	const ctxParams = {
		...ctx,
		store,
		req,
		isServer,
		pathPrefix,
	};

	const unPrefixedPath = `/${asPath.split('/').slice(2).join('/')}`;

	const { asPrefix, query: qError } = await handleAuthentication(ctxParams);

	console.log(query)

	const generalData = {
		pathname,
		asPath,
		unPrefixedPath,
		pathPrefix,
		asPrefix,
		scope : 'partner',
		query : { ...query, ...(qError || {}) },
		isServer,
	};

	await store.dispatch(setGeneralState(generalData));

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
