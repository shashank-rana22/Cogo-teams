const userLoggedIn = ({ orgIds, shipment_data = {}, activeStakeholder = '' }) => {
	const { importer_exporter_id, shipper_consignee_id } = shipment_data;

	let is_importer_exporter_kam = false;
	let is_shipper_consignee_kam = false;

	orgIds.forEach((id) => {
		if (id === importer_exporter_id && importer_exporter_id) {
			is_importer_exporter_kam = true;
		} else if (id === shipper_consignee_id && shipper_consignee_id) {
			is_shipper_consignee_kam = true;
		}
	});

	let kamLoggedIn = '';

	if (is_importer_exporter_kam && !is_shipper_consignee_kam && activeStakeholder === 'kam') {
		kamLoggedIn = 'ieKam';
	} else if (!is_importer_exporter_kam && is_shipper_consignee_kam) {
		kamLoggedIn = 'scKam';
	}

	return {
		kamLoggedIn,
	};
};

export default userLoggedIn;
