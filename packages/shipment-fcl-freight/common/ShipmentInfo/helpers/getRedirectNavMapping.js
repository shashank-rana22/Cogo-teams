const booking_list_priority_array = [
	{ name: 'coe-shipments', version: 'v1' },
	{ name: 'coe-booking_desk', version: 'v2' },
	{ name: 'coe-bl_do_collection_release', version: 'v1' },
	{ name: 'coe-kam_desk', version: 'v1' },
	{ name: 'coe-document_desk', version: 'v1' },
	{ name: 'coe-last_mile', version: 'v1' },
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

	let navToRedirect = false;
	let version = 'v1';

	booking_list_priority_array.some((prNav) => {
		navToRedirect = coe_navs.find((nav) => nav.key === prNav.name) ?? false;
		version = prNav.version;

		return navToRedirect !== false;
	});

	if (navToRedirect === false) {
		navToRedirect = { href: '/', as: '/' };
	}

	return { navToRedirect, version };
};
