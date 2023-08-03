import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';

const MIN_LENGTH = 1;

const getNavData = (navigation, projectNavigationMappings = null) => {
	const navigationMappings = projectNavigationMappings || navigationMappingAdmin;
	const navs = navigation.split('-');

	const isSubNavs = navs.length > MIN_LENGTH;

	const mainNav = navigationMappings?.[navs[GLOBAL_CONSTANTS.zeroth_index]];
	const navigationData = isSubNavs
		? mainNav.options.find((optObj) => optObj.key === navigation)
		: mainNav;

	return navigationData;
};
export default getNavData;
