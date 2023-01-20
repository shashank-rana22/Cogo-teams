import navigationMappingAdmin from './navigation-mapping-admin';

const getSideBarConfigs = (userData, pinnedNavKeys = []) => {
	const pNavs = userData?.permissions_navigations || {};

	const modifiedPinnedNavKeys = pinnedNavKeys.filter((key) => Object.keys(navigationMappingAdmin).includes(key));

	const filteredKeys = Object.keys(navigationMappingAdmin).filter(
		(key) => !modifiedPinnedNavKeys.includes(key),
	);

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
			partner    : getNavMappings(filteredKeys),
			pinnedNavs : getNavMappings(modifiedPinnedNavKeys),
		},
	};
};

export default getSideBarConfigs;
