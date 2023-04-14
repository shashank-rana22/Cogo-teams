import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';
import { Router } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import * as Sentry from '@sentry/nextjs';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import Layout from './layout';
import SessionCheck from './SessionCheck';

if (process.env.NODE_ENV === 'production') {
	const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
	if (SENTRY_DSN) {
		try {
			Sentry.init({
				dsn              : SENTRY_DSN,
				tracesSampleRate : 1.0,
				ignoreErrors     : [
					'Non-Error promise rejection captured with keys: message',
					'Non-Error promise rejection captured with keys: message',
					'Request failed with status code 403',
					'Non-Error promise rejection captured with keys: data, error, status',
					'Request failed with status code 401',
					"Cannot read properties of null (reading 'getBoundingClientRect')",
					'AxiosError: Network Error',
					'CanceledError: canceled',
				],
			});
		} catch (err) {
			// console.log(err);
		}
	}
}

function MyApp({ Component, pageProps }) {
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
		<Provider store={store}>
			<SessionCheck>
				<title>Cogoport - Simplifying International Logistics</title>
				<Layout layout={pageProps.layout || 'authenticated'}>
					<Component {...pageProps} />
				</Layout>
			</SessionCheck>
		</Provider>
	);
}

export default MyApp;
