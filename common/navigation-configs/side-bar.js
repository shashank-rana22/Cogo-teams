import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import navigationMapping from './navigation-mapping-admin';

const getCondition = (urlItem) => {
	const CONDITION = {};
	if (urlItem?.user_email) {
		CONDITION.user_email = urlItem.user_email;
	}
	if (urlItem?.user_role_ids) {
		CONDITION.user_role_ids = urlItem.user_role_ids;
	}
	if (urlItem?.user_id) {
		CONDITION.user_id = urlItem.user_id;
	}
	return CONDITION;
};

const AJEET_EMAIL_ID = 'ajeet@cogoport.com';

const getSideBarConfigs = ({
	userData,
	dashboardUrls = [],
	pinnedNavKeys = [],
	t = () => {},
}) => {
	const pNavs = userData?.permissions_navigations || {};

	const navigationMappingAdmin = navigationMapping({ t });

	const modifiedPinnedNavKeys = pinnedNavKeys.filter((key) => Object.keys(navigationMappingAdmin).includes(key));

	const filteredKeys = Object.keys(navigationMappingAdmin).filter(
		(key) => !modifiedPinnedNavKeys.includes(key),
	);

	const getNavMappings = (navMappingKeys) => {
		const NAV_ITEMS = [];

		(navMappingKeys || []).forEach((key) => {
			const { showInNav = true } = navigationMappingAdmin?.[key] || {};
			if (
				key
				&& showInNav
				&& (pNavs?.[key] || navigationMappingAdmin[key]?.options)
			) {
				if (key === 'dashboards') {
					NAV_ITEMS.push({
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
						(nav) => nav.split('-')[GLOBAL_CONSTANTS.zeroth_index] === key,
					);
					const filteredOpts = allOpts.filter(
						(opt) => selectedSubNavs.includes(opt.key)
							&& (opt.key !== 'coe-booking_tasks'
								|| userData.email === AJEET_EMAIL_ID),
					);
					if (filteredOpts.length) {
						NAV_ITEMS.push({
							...navigationMappingAdmin[key],
							options: filteredOpts,
						});
					}
				} else if (pNavs?.[key]) {
					NAV_ITEMS.push(navigationMappingAdmin[key]);
				}
			}
		});
		return NAV_ITEMS;
	};

	return {
		nav_items: {
			partner    : getNavMappings(filteredKeys),
			pinnedNavs : getNavMappings(modifiedPinnedNavKeys),
		},
	};
};

export default getSideBarConfigs;
