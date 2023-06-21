export default function getNavigationFromUrl() {
	const navigation = new URLSearchParams(window?.location?.search)?.get('navigation');
	return navigation || undefined;
}
