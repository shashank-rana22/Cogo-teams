import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';

const getNavData = (navigation) => {
	const navs = navigation.split('-');
	const isSubNavs = navs.length > 1;
	const mainNav = navigationMappingAdmin?.[navs[0]];
	const navigationData = isSubNavs
		? mainNav?.options?.find((optObj) => optObj.key === navigation)
		: mainNav;
	return navigationData;
};
export default getNavData;
