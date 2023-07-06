export default function getNavigationFromUrl() {
	if (typeof window === 'object') {
		const navigation = new URLSearchParams(window?.location?.search)?.get('navigation');
		return navigation || undefined;
	}
	return undefined;
}
