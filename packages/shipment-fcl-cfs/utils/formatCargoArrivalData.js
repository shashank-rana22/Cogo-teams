const CONTAINER_KEYS = ['container_no',
	'marks_and_number', 'package_description', 'gross_weight', 'measurement', 'seal',
];

const SHIPMENT_DETAILS_KEY = ['po_no', 'hbl_no', 'vessel', 'voyage', 'flight_number', 'obl_number',
	'obl_date', 'service_name', 'booking_no', 'carrier_name', 'origin', 'destination',
	'eta', 'etd', 'warehouse', 'item_no', 'sub_item_no', 'all_prepaid',
];

const formatCargoArrivalData = (values) => {
	const shipmentDetailObj = {};

	const containerObj = {};

	const formattedValues = {};

	Object.keys(values || {}).forEach((key) => {
		if (CONTAINER_KEYS.includes(key)) {
			containerObj[key] = values?.[key] || '';
		}

		if (SHIPMENT_DETAILS_KEY.includes(key)) {
			shipmentDetailObj[key] = values?.[key] || '';
		} else if (
			!SHIPMENT_DETAILS_KEY.includes(key)
			&& !CONTAINER_KEYS.includes(key)
		) {
			formattedValues[key] = values?.[key] || '';
		}
	});

	formattedValues.containers = [containerObj];

	formattedValues.shipment_details = shipmentDetailObj;

	return formattedValues;
};

export default formatCargoArrivalData;
