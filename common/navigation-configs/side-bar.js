import navigationMappingAdmin from './navigation-mapping-admin';

const getSideBarConfigs = (userData) => {
	const pNavs = userData?.permissions_navigations || {};

	const filteredKeys = Object.keys(navigationMappingAdmin);

	const getNavMappings = (navMappingKeys) => {
		const nav_items = [];

		(navMappingKeys || []).forEach((key) => {
			const { showInNav = true } = navigationMappingAdmin?.[key] || {};
			if (key && showInNav && (pNavs?.[key])) {
				nav_items.push(navigationMappingAdmin[key]);
			}
		});
		return nav_items;
	};

	return {
		nav_items: {
			partner: getNavMappings(filteredKeys),
		},
	};
};

export default getSideBarConfigs;
