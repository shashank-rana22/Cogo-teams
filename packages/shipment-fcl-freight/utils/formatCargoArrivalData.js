const CONTAINER_KEY = ['container_no', 'marks_and_number', 'package_description', 'gross_weight', 'measurement', 'seal',
];

const DETAILS_KEY = ['po_no', 'hbl_no', 'vessel', 'voyage', 'flight_number', 'obl_number',
	'obl_date', 'service_name', 'booking_no', 'carrier_name', 'origin', 'destination',
	'eta', 'etd', 'warehouse', 'item_no', 'sub_item_no', 'all_prepaid',
];

const formatCargoArrivalData = (values) => {
	const SHIPMENT_DETAIL = {};

	const CONTAINER = {};

	const FORMATTED_VALUES = {};

	Object.keys(values || {}).forEach((key) => {
		if (CONTAINER_KEY.includes(key)) {
			CONTAINER[key] = values?.[key] || '';
		}

		if (DETAILS_KEY.includes(key)) {
			SHIPMENT_DETAIL[key] = values?.[key] || '';
		} else if (
			!DETAILS_KEY.includes(key) && !CONTAINER_KEY.includes(key)
		) {
			FORMATTED_VALUES[key] = values?.[key] || '';
		}
	});

	FORMATTED_VALUES.containers = [CONTAINER];

	FORMATTED_VALUES.shipment_details = SHIPMENT_DETAIL;

	return FORMATTED_VALUES;
};

export default formatCargoArrivalData;
