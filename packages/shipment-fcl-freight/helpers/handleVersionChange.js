import getNavigationFromUrl from '@cogoport/request/helpers/getNavigationFromUrl';

export default function handleVersionChange({ partner_id = '', shipment_id = '' }) {
	if (typeof window !== 'object') {
		return;
	}

	const navigation = getNavigationFromUrl();

	let newHref = `${window.location.origin}/${partner_id}/shipments/${shipment_id}`;
	newHref += navigation ? `?navigation=${navigation}` : '';

	window.location.replace(newHref);
	window.sessionStorage.setItem('prev_nav', newHref);
}
