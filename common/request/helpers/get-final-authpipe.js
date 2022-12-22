import getOtherApiPipe from './get-other-pipe';
import routeConfig from './route-config';

const getAuthorizationParams = (store, url) => {
	if (typeof window !== 'undefined') {
		const getStoreState = store?.getState;
		const profile =	typeof getStoreState === 'function' ? getStoreState()?.profile : {};
		const { authorizationparameters, pathname } = profile.data;
		const fallback_navigation = routeConfig?.[pathname]?.navigation || '';

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
