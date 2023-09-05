import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const handleCopy = async ({ detail = {}, shipment_id = '', checkout_id = '' }) => {
	const { importer_exporter_id, importer_exporter_branch_id, importer_exporter = {} } = detail;

	let url = '';

	if (importer_exporter.tags?.[GLOBAL_CONSTANTS.zeroth_index] === 'partner') {
		url = `https://partners.cogoport.com/${
			importer_exporter.partner_id
		}/checkout/${checkout_id}`;
	} else if (shipment_id) {
		url = `https://app.cogoport.com/${importer_exporter_id}/
			${importer_exporter_branch_id}/checkout/${checkout_id}/${shipment_id}`;
	} else {
		url = `https://app.cogoport.com/${importer_exporter_id}/
			${importer_exporter_branch_id}/checkout/${checkout_id}`;
	}

	try {
		await navigator.clipboard.writeText(url);
		Toast.success('Copied successfully!');
		return { hasError: false };
	} catch (error) {
		Toast.error(error?.message || 'Cannot copy!');
		return { hasError: true };
	}
};

export default handleCopy;
