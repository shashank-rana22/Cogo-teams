const booking_list_priority_array = [
	'coe-shipments',
	'coe-booking_desk',
	'coe-bl_do_collection_release',
	'coe-kam_desk',
	'coe-document_desk',
	'coe-last_mile',
];

export const eventListener = () => {
	window.sessionStorage.setItem('prev_nav', window.location.href);
};

export const backAllowed = (routerComponents) => {
	const prev_nav_restricted = window.sessionStorage.getItem('prev_nav_restricted');
	const prev_nav = window.sessionStorage.getItem('prev_nav');
	const just_refreshed = prev_nav === window.location.href;
	const isDirect = Object.keys(routerComponents || {}).length <= 2;

	let isBackAllowed = !isDirect || just_refreshed;
	if (typeof prev_nav_restricted === 'string') {
		isBackAllowed = false;
	}
	return isBackAllowed;
};

export const getRedirectNavMapping = (allNavs) => {
	const coe_navs = (allNavs || []).find((nav) => nav.key === 'coe')?.options || [];

	let nav_to_redirect = false;
	booking_list_priority_array.some((prNav) => {
		nav_to_redirect = coe_navs.find((nav) => nav.key === prNav) ?? false;
		return nav_to_redirect !== false;
	});

	return nav_to_redirect || { href: '/', as: '/' };
};
