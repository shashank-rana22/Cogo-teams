export default function getNavigationFromUrl() {
	let navigation;
	if (typeof window !== 'undefined') {
		navigation = new URLSearchParams(window?.location?.search)?.get('navigation');
	}

	return navigation;
}
