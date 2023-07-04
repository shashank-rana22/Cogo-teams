const ROUTER_COMPONENTS_MAX_LENGTH = 2;

const BOOKING_LIST_PRIORITY_ARRAY = [
	{ name: 'coe-shipments' },
	{ name: 'coe-booking_note_desk' },
	{ name: 'coe-bl_do_collection_release' },
	{ name: 'coe-kam_desk' },
	{ name: 'coe-document_desk' },
	{ name: 'coe-last_mile' },
];

export const eventListener = () => {
	window.sessionStorage.setItem('prev_nav', window.location.href);
};

export const backAllowed = (routerComponents) => {
	const prev_nav_restricted = window.sessionStorage.getItem('prev_nav_restricted');
	const prev_nav = window.sessionStorage.getItem('prev_nav');
	const just_refreshed = prev_nav === window.location.href;
	const isDirect = Object.keys(routerComponents || {}).length <= ROUTER_COMPONENTS_MAX_LENGTH;

	let isBackAllowed = !isDirect || just_refreshed;
	if (typeof prev_nav_restricted === 'string') {
		isBackAllowed = false;
	}
	return isBackAllowed;
};

export const getRedirectNavMapping = (allNavs) => {
	const coe_navs = (allNavs || []).find((nav) => nav.key === 'coe')?.options || [];

	let navToRedirect = false;

	BOOKING_LIST_PRIORITY_ARRAY.some((prNav) => {
		navToRedirect = coe_navs.find((nav) => nav.key === prNav.name) ?? false;

		return navToRedirect !== false;
	});

	if (navToRedirect === false) {
		return { navToRedirect: { href: '/', as: '/' }, version: 'v2' };
	}
	const version = (navToRedirect.href || '').includes('v2') ? 'v2' : 'v1';

	return { navToRedirect, version };
};
