import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';
import { Router } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import * as Sentry from '@sentry/nextjs';
import { appWithTranslation } from 'next-i18next';
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

function MyApp({ Component, pageProps, firestoreCustomToken = '' }) {
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
			<SessionCheck firestoreToken={firestoreCustomToken}>
				<title>Cogoport - Simplifying International Logistics</title>
				<Layout layout={pageProps.layout || 'authenticated'}>
					<Component {...pageProps} />
				</Layout>
			</SessionCheck>
		</Provider>
	);
}

MyApp.getInitialProps = async () => {
	// eslint-disable-next-line global-require
	const admin = require('firebase-admin');

	const serviceAccount = {
		type           : 'service_account',
		project_id     : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		private_key_id : process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key    : process.env.FIREBASE_PRIVATE_KEY
			? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
			: undefined,
		client_email                : process.env.FIREBASE_CLIENT_EMAIL,
		client_id                   : process.env.FIREBASE_CLIENT_ID,
		auth_uri                    : process.env.FIREBASE_AUTH_URI,
		token_uri                   : process.env.FIREBASE_TOKEN_URI,
		auth_provider_x509_cert_url : process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url        : process.env.FIREBASE_CLIENT_X509_CERT_URL,
	};
	const config = {
		credential  : admin.credential.cert(serviceAccount),
		databaseURL : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	};
	const appExists = admin.apps.some((val) => val.name === 'secondary');

	const secondary_app = appExists
		? admin.app('secondary')
		: admin.initializeApp(config, 'secondary');

	const uid = process.env.FIRESTORE_AUTH_UID;
	const adminAuth = admin.auth(secondary_app);
	let firestoreCustomToken = '';

	await adminAuth
		.createCustomToken(uid)
		.then((customToken) => {
			firestoreCustomToken = customToken;
		})
		.catch((error) => {
			console.log(error);
		});

	return { pageProps: { layout: 'none' }, firestoreCustomToken };
};

export default appWithTranslation(MyApp);
