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

		const authorizationparameters = getAuthParam(
			profile?.permissions_navigations,
			pathname,
		);
		console.log(authorizationparameters, 'authorizationparameters');

		console.log({ profile, pathname, fallback_navigation, routeConfig }, 'data');

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
