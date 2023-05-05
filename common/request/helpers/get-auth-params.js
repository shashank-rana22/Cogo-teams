import { routeConfig } from '@cogoport/navigation-configs';

import getNavData from './get-nav-data';

const getAuthParam = (permissions_navigations, pathname) => {
	let navigation = routeConfig?.[pathname]?.navigation || '';

	const permissionNavigationKeys = Object.keys(permissions_navigations || {});

	if (permissionNavigationKeys?.length && !permissionNavigationKeys?.includes(navigation)) {
		const alternatekeys = routeConfig?.[pathname]?.alternateNavigation || [];
		let find = false;

		alternatekeys?.forEach((key) => {
			if (permissionNavigationKeys?.includes(key) && !find) {
				find = true;
				navigation = key;
			}
		});
	}

	const navigationData = getNavData(navigation);
	const userNavigationPermissions = permissions_navigations?.[navigation];
	let defaultScope = null;
	let defaultView = null;
	(navigationData?.main_apis || []).forEach((api) => {
		const apiData = userNavigationPermissions?.[api];
		(apiData || []).forEach((scope) => {
			if (scope?.is_default && scope.type !== 'none') {
				defaultScope = scope?.type;
				defaultView = scope?.through_criteria?.[0] || null;
			}
		});
	});

	let authorizationparameters = `${navigation}:${defaultScope}`;

	if (defaultView) {
		authorizationparameters = `${authorizationparameters}:${defaultView}`;
	}

	if (navigation && defaultScope) {
		return authorizationparameters;
	}
	return null;
};
export default getAuthParam;
