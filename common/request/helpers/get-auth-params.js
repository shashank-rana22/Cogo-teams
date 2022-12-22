import getNavData from './get-nav-data';
import routeConfig from './route-config';

const getAuthParam = (permissions_navigations, pathname) => {
	const navigation = routeConfig?.[pathname]?.navigation || '';
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
