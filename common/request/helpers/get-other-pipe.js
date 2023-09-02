import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { routeConfig } from '@cogoport/navigation-configs';

import getNavData from './get-nav-data';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;

const getOtherApiPipe = (url, authorizationparameters, getStoreState) => {
	try {
		const profile =	typeof getStoreState === 'function' ? getStoreState()?.profile : {};
		const general =	typeof getStoreState === 'function' ? getStoreState()?.general : {};

		const fallback_navigation = routeConfig?.[general?.pathname]?.navigation || '';
		const authParams = authorizationparameters?.split(':');
		const navigation = authParams?.[GLOBAL_CONSTANTS.zeroth_index] || fallback_navigation;
		const globalDefaultScope = authParams?.[FIRST_INDEX];
		const globalDefaultView = authParams?.[SECOND_INDEX];

		const navigationData = getNavData({ navigation });

		const { main_apis } = navigationData || {};
		const actualApi = url?.split('/')?.[FIRST_INDEX] || url?.split('/')?.[GLOBAL_CONSTANTS.zeroth_index];
		const userNavigationPermissions = profile?.permissions_navigations?.[navigation];
		if (!(main_apis || []).includes(actualApi)) {
			const apiData = userNavigationPermissions?.[actualApi];
			let defaultScope = null;
			let defaultView = null;
			const scopeMatchingGlobalApi = (apiData || []).find(
				(scope) => scope?.view_type === globalDefaultScope
					&& scope?.through_criteria?.includes(globalDefaultView),
			);
			if (scopeMatchingGlobalApi) {
				defaultScope = globalDefaultScope;
				defaultView = globalDefaultView;
			} else {
				(apiData || []).forEach((scope) => {
					if (scope?.is_default && scope.view_type !== 'none') {
						defaultScope = scope?.view_type;
						defaultView = scope?.through_criteria?.[GLOBAL_CONSTANTS.zeroth_index] || null;
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
