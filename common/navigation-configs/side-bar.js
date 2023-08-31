import navigationMappingAdmin from './navigation-mapping-admin';

const getCondition = (urlItem) => {
	const condition = {};
	if (urlItem?.user_email) {
		condition.user_email = urlItem.user_email;
	}
	if (urlItem?.user_role_ids) {
		condition.user_role_ids = urlItem.user_role_ids;
	}
	if (urlItem?.user_id) {
		condition.user_id = urlItem.user_id;
	}
	return condition;
};

const AJEET_EMAIL_ID = 'ajeet@cogoport.com';

const getSideBarConfigs = ({
	userData,
	dashboardUrls = [],
	pinnedNavKeys = [],
}) => {
	const pNavs = userData?.permissions_navigations || {};

	const modifiedPinnedNavKeys = pinnedNavKeys.filter((key) => Object.keys(navigationMappingAdmin).includes(key));

	const filteredKeys = Object.keys(navigationMappingAdmin).filter(
		(key) => !modifiedPinnedNavKeys.includes(key),
	);

	const getNavMappings = (navMappingKeys) => {
		const nav_items = [];

		(navMappingKeys || []).forEach((key) => {
			const { showInNav = true } = navigationMappingAdmin?.[key] || {};

			if (
				key
				&& showInNav
				&& (pNavs?.[key] || navigationMappingAdmin[key]?.options)
			) {
				if (key === 'dashboards') {
					nav_items.push({
						...navigationMappingAdmin[key],
						options: dashboardUrls.map((urlItem) => ({
							title     : urlItem.title,
							type      : 'link',
							as        : `/dashboards/${urlItem.urlKey}`,
							href      : '/dashboards/[dashboard_type]',
							condition : getCondition(urlItem),
						})),
					});
				} else if (
					navigationMappingAdmin[key]?.options
					&& navigationMappingAdmin[key].isSubNavs
				) {
					const allOpts = navigationMappingAdmin[key]?.options || [];
					const selectedSubNavs = Object.keys(pNavs).filter(
						(nav) => nav.split('-')[0] === key,
					);
					const filteredOpts = allOpts.filter(
						(opt) => selectedSubNavs.includes(opt.key)
							&& (opt.key !== 'coe-booking_tasks'
								|| userData.email === AJEET_EMAIL_ID),
					);
					if (filteredOpts.length) {
						nav_items.push({
							...navigationMappingAdmin[key],
							options: filteredOpts,
						});
					}
				} else if (pNavs?.[key]) {
					nav_items.push(navigationMappingAdmin[key]);
				}
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
