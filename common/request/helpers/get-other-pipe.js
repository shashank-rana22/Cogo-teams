import { routeConfig } from '@cogoport/navigation-configs';

import getNavData from './get-nav-data';

const getOtherApiPipe = (url, authorizationparameters, getStoreState) => {
	try {
		const profile =	typeof getStoreState === 'function' ? getStoreState()?.profile : {};
		const general =	typeof getStoreState === 'function' ? getStoreState()?.general : {};

		const fallback_navigation = routeConfig?.[general?.pathname]?.navigation || '';
		const authParams = authorizationparameters?.split(':');
		const navigation = authParams?.[0] || fallback_navigation;
		const globalDefaultScope = authParams?.[1];
		const globalDefaultView = authParams?.[2];

		const navigationData = getNavData(navigation);

		const { main_apis } = navigationData || {};
		const actualApi = url?.split('/')?.[1] || url?.split('/')?.[0];
		const userNavigationPermissions = profile?.permissions_navigations?.[navigation];
		if (!(main_apis || []).includes(actualApi)) {
			const apiData = userNavigationPermissions?.[actualApi];
			let defaultScope = null;
			let defaultView = null;
			const scopeMatchingGlobalApi = (apiData || []).find(
				(scope) => scope?.type === globalDefaultScope
					&& scope?.through_criteria?.includes(globalDefaultView),
			);
			if (scopeMatchingGlobalApi) {
				defaultScope = globalDefaultScope;
				defaultView = globalDefaultView;
			} else {
				(apiData || []).forEach((scope) => {
					if (scope?.is_default && scope.type !== 'none') {
						defaultScope = scope?.type;
						defaultView = scope?.through_criteria?.[0] || null;
					}
				});
			}

			if (navigation && defaultScope) {
				if (defaultView) {
					return {
						pipe   : `${navigation}:${defaultScope}:${defaultView}`,
						isMain : false,
					};
				}
				return { pipe: `${navigation}:${defaultScope}`, isMain: false };
			}
			return { pipe: null, isMain: false };
		}
		return { pipe: null, isMain: true };
	} catch (err) {
		return { pipe: null, isMain: true };
	}
};
export default getOtherApiPipe;
