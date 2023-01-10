import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';
import { Router } from '@cogoport/next';
import store, { Provider } from '@cogoport/store';
import { appWithTranslation } from 'next-i18next';
import pageProgessBar from 'nprogress';
import './global.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import Layout from './layout';
import SessionCheck from './SessionCheck';

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
				<Layout layout={pageProps.layout || 'authenticated'}>
					<Component {...pageProps} />
				</Layout>
			</SessionCheck>
		</Provider>
	);
}

export default appWithTranslation(MyApp);
