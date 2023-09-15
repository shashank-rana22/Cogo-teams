import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { routeConfig } from '@cogoport/navigation-configs';

import getAuthParam from './get-auth-params';
import getOtherApiPipe from './get-other-pipe';

const getAuthorizationParams = (store, url) => {
	if (typeof window !== 'undefined') {
		const getStoreState = store?.getState;
		const profile =	typeof getStoreState === 'function' ? getStoreState()?.profile : {};
		const general = typeof getStoreState === 'function' ? getStoreState()?.general : {};
		const { pathname } = general;
		const fallback_navigation = routeConfig?.[pathname]?.navigation || '';

		const { authParams: authParamFromStore } = profile;

		const defaultAuthParameters = getAuthParam(
			profile?.permissions_navigations,
			pathname,
		);

		let authorizationparameters = defaultAuthParameters;

		if (
			authParamFromStore
			&& authorizationparameters
			&& authorizationparameters.split(':')[GLOBAL_CONSTANTS.zeroth_index]
				=== authParamFromStore.split(':')[GLOBAL_CONSTANTS.zeroth_index]
		) {
			authorizationparameters = authParamFromStore;
		}

		if (authorizationparameters || fallback_navigation) {
			const { pipe, isMain } = getOtherApiPipe(
				url,
				authorizationparameters,
				getStoreState,
			);

			if (pipe) {
				return pipe;
			}

			if (!isMain) {
				return null;
			}

			return authorizationparameters;
		}
		return null;
	}

	return '';
};
export default getAuthorizationParams;
