import '@cogoport/components/dist/themes/supernova.css';
import store from '@cogoport/store';
import Head from 'next/head';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import handleAuthentication from '../../utils/auth/handleAuthentication';
import Layout from '../Layout';
import Loader from '../Loader';

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			setLoading(true);
		});
		Router.events.on('routeChangeComplete', () => {
			setLoading(false);
		});
		Router.events.on('routeChangeError', () => {
			setLoading(false);
		});
	}, [Router]);

	return (
		<SWRConfig value={{
			provider : () => new Map(),
			suspense : true,
			fallback : { 'https://api.github.com/repos/vercel/swr': null },
		}}
		>
			<Provider store={store}>
				<Head>
					<title>Admin | Cogoport</title>
				</Head>
				<Layout layout={pageProps.layout || 'authenticated'}>
					{loading ? <Loader /> : <Component {...pageProps} />}
				</Layout>
			</Provider>
		</SWRConfig>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { req, pathname, asPath } = ctx;
	const isServer = typeof req !== 'undefined';
	const pathPrefix = '/[partner_id]';

	const ctxParams = {
		...ctx,
		store,
		isServer,
		pathPrefix,
	};

	const unPrefixedPath = `/${asPath.split('/').slice(2).join('/')}`;

	const response = await handleAuthentication(ctxParams);

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
