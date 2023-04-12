const userLoggedIn = ({ orgIds, shipment_data = {}, activeStakeholder = '' }) => {
	const { importer_exporter_id, consignee_shipper_id } = shipment_data;

	let is_importer_exporter_kam = false;
	let is_consignee_shipper_kam = false;

	orgIds.forEach((id) => {
		if (id === importer_exporter_id && importer_exporter_id) {
			is_importer_exporter_kam = true;
		} else if (id === consignee_shipper_id && consignee_shipper_id) {
			is_consignee_shipper_kam = true;
		}
	});

	let kamLoggedIn = '';

	if (is_importer_exporter_kam && !is_consignee_shipper_kam && activeStakeholder === 'Kam') {
		kamLoggedIn = 'ieKam';
	} else if (!is_importer_exporter_kam && is_consignee_shipper_kam) {
		kamLoggedIn = 'scKam';
	}

	return {
		kamLoggedIn,
	};
};

export default userLoggedIn;
