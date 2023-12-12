import { navigationMappingsAdmin } from '@cogoport/navigation-configs';

export default function getNavData({ navigation = '' }) {
	const [mainNav, subNav] = navigation.split('-');

	const mainNavData = navigationMappingsAdmin({})[mainNav];
	console.log(mainNavData, 'mainNavData');

	return subNav ? (
		(mainNavData || {}).options || [])
		.find((optObj) => optObj.key === navigation)
		: mainNavData;
}
