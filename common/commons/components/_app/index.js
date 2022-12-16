import '@cogoport/components/src/themes/supernova/index.css';
import { Provider as StoreProvider } from '@cogoport/store';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import handleAuthentication from '../../utils/auth/handleAuthentication';
import withStore from '../../utils/store';
import Layout from '../Layout';

function MyApp({ Component, pageProps, store }) {
	return (
		<SWRConfig value={{
			provider : () => new Map(),
			suspense : true,
			fallback : { 'https://api.github.com/repos/vercel/swr': null },
		}}
		>
			<StoreProvider store={store}>
				<Head>
					<title>Admin | Cogoport</title>
				</Head>
				<Layout layout={pageProps.layout || 'authenticated'}>
					<Component {...pageProps} />
				</Layout>
			</StoreProvider>
		</SWRConfig>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { req, pathname, asPath } = ctx;
	const isServer = typeof req !== 'undefined';
	const pathPrefix = '/[partner_id]';

	const ctxParams = {
		...ctx,
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

export default withStore(MyApp);
