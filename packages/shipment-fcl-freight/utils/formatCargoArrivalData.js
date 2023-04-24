const formatCargoArrivalData = (values) => {
	const containerKey = [
		'container_no',
		'marks_and_number',
		'package_description',
		'gross_weight',
		'measurement',
		'seal',
	];

	const shipmentDetailsKey = [
		'po_no',
		'hbl_no',
		'hawb_no',
		'vessel',
		'voyage',
		'flight_number',
		'obl_number',
		'obl_date',
		'mawb_no',
		'mawb_date',
		'service_name',
		'booking_no',
		'carrier_name',
		'origin',
		'destination',
		'eta',
		'etd',
		'warehouse',
		'item_no',
		'sub_item_no',
		'all_prepaid',
		'airline_name',
	];

	const shipmentDetailObj = {};

	const containerObj = {};

	const formattedValues = {};

	Object.keys(values || {}).forEach((key) => {
		if (containerKey.includes(key)) {
			containerObj[key] = values[key] || '';
		}
		if (shipmentDetailsKey.includes(key)) {
			shipmentDetailObj[key] = values[key] || '';
		} else if (
			!shipmentDetailsKey.includes(key)
			&& !containerKey.includes(key)
		) {
			formattedValues[key] = values[key] || '';
		}
	});
	formattedValues.containers = [containerObj];
	formattedValues.shipment_details = shipmentDetailObj;

	return formattedValues;
};

export default formatCargoArrivalData;
