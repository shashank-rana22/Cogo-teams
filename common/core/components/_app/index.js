import '@cogoport/components/dist/themes/dawn.css';
import handleAuthentication from '@cogoport/authentication/utils/handleAuthentication';
import { Router, RoutesProvider } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import { setGeneralState } from '@cogoport/store/reducers/general';
import { setProfileState } from '@cogoport/store/reducers/profile';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import Layout from './layout';

const isServer = typeof window === 'undefined';

if (!isServer) {
	window[process.env.NEXT_PUBLIC_ADMIN_STORE] = store;
}

function MyApp({
	Component, pageProps, pathPrefix, asPrefix, query,
	profile,
	generalData,
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

	store.dispatch(setProfileState(profile));
	store.dispatch(setGeneralState(generalData));

	return (
		<SWRConfig value={{
			provider : () => new Map(),
			suspense : true,
			fallback : { 'https://api.github.com/repos/vercel/swr': null },
		}}
		>
			<Provider store={store} initialProps={{ profile }}>
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

	const { profile } = store.getState();

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
		profile,
		generalData,
	};
};

export default MyApp;
