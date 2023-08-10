const getRpaMappings = (task, shipment_data, values) => {
	if (task?.task === 'mark_confirmed') {
		return values?.booking_reference_number
			? {
				cogo_shipment_id        : task?.shipment_id,
				cogo_shipment_serial_no : shipment_data?.serial_id,
				general_reference       : values?.booking_reference_number,
			}
			: null;
	}

	if (task?.task === 'upload_draft_bill_of_lading') {
		return {
			cogo_shipment_id        : task?.shipment_id,
			cogo_shipment_serial_no : shipment_data?.serial_id,
			bill_of_lading          : values?.bill_of_lading,
		};
	}
	return null;
};

export default getRpaMappings;
