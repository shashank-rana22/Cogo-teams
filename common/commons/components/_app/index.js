import '@cogoport/components/dist/themes/supernova.css';
import store from '@cogoport/store';
import Head from 'next/head';
import Router from 'next/router';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import handleAuthentication from '../../utils/auth/handleAuthentication';
import Layout from '../Layout';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			pageProgessBar.start();
			pageProgessBar.set(0.4);
		});

		Router.events.on('routeChangeComplete', () => {
			pageProgessBar.done();
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
					<Component {...pageProps} />
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

	await handleAuthentication(ctxParams);

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
