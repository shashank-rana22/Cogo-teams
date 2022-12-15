import React from 'react';

const isServer = typeof window === 'undefined';

const withRedux = (initializeStore, config) => {
	const { storeKey = process.env.NEXT_PUBLIC_STORE_KEY } = config;

	const getOrCreateStore = (initialState) => {
		if (isServer) {
			return initializeStore(initialState);
		}

		if (!window[storeKey]) {
			window[storeKey] = initializeStore(initialState);
		}
		return window[storeKey];
	};

	return (App) => {
		function AppWithRedux({ initialReduxState, ...props }) {
			const store = getOrCreateStore(initialReduxState);
			return <App {...props} store={store} />;
		}

		AppWithRedux.getInitialProps = async (appContext) => {
			const store = getOrCreateStore();
			appContext.ctx.store = store;

			let appProps = {};
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext);
			}

			return {
				...appProps,
				initialReduxState: store.getState(),
			};
		};

		return AppWithRedux;
	};
};

export default withRedux;
