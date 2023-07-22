import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';

const getNavData = (navigation, projectNavigationMappings = null) => {
	const navigationMappings = projectNavigationMappings || navigationMappingAdmin;
	const navs = navigation.split('-');
	// eslint-disable-next-line no-magic-numbers
	const isSubNavs = navs.length > 1;
	// eslint-disable-next-line custom-eslint/zeroth-index-import, no-magic-numbers
	const mainNav = navigationMappings?.[navs[0]];
	const navigationData = isSubNavs
		? mainNav?.options.find((optObj) => optObj.key === navigation)
		: mainNav;

	return navigationData;
};
export default getNavData;
