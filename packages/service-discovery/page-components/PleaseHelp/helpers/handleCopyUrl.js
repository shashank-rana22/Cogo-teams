import { Toast } from '@cogoport/components';

const handleCopy = async ({ detail = {}, shipment_id = '', checkout_id = '' }) => {
	const url = shipment_id
		? `https://app.cogoport.com/app/${detail?.importer_exporter_id}/${detail?.importer_exporter_branch_id}/importer-
		exporter/checkout/${checkout_id}/${shipment_id}`
		: `https://app.cogoport.com/app/${detail?.importer_exporter_id}/${detail?.importer_exporter_branch_id}/imp
		orter-exporter/checkout/${checkout_id}`;

	try {
		await navigator.clipboard.writeText(url);
		Toast.success('Copied successfully!');
	} catch (error) {
		Toast.error(error?.message || 'Cannot copy!');
	}
};

export default handleCopy;
