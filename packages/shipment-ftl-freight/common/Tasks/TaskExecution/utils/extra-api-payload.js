import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const NUMBER_KEYS = ['bls_count', 'volume', 'weight', 'packages_count'];

const NOT_INCLUDE_FIELD_IN_FTL = [
	'truck_details_count',
	'id',
	'display_booked_trucks',
	'display_booking_weight',
	'display_destination_location',
	'display_origin_location',
	'trailer_details_count',
	'container_details_count',
];
const FIRST_INDEX = 1;
const { zeroth_index } = GLOBAL_CONSTANTS;

const extraApiPayload = (values, end_point, task) => {
	if (end_point === 'create_shipment_document') {
		let documentArr = [{ ...(values?.documents || {}) }];

		if (isEmpty(documentArr)) documentArr = [values];

		const formatValues = (documentArr || []).map((obj) => {
			const newObj = JSON.parse(JSON.stringify(obj || {}));

			delete newObj?.url;

			return {
				file_name    : obj?.url?.name,
				document_url : obj?.url?.url || obj?.url,
				data         : { ...(newObj || {}) },
			};
		});

		return { documents: formatValues };
	}

	if (end_point === 'update_shipment_service') return { data: values };

	if (end_point === 'bulk_update_shipment_services') {
		const payload = {
			service      : task.shipment_type,
			service_data : [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			const DATA = {};

			Object.keys(values).forEach((key) => {
				if (key === 'truck_details') {
					const index = values[key].findIndex((ind) => ind.id === item);

					Object.keys(values[key][index]).forEach((lineItem) => {
						if (lineItem === 'name' || lineItem === 'contact') {
							if ('driver_details' in DATA) {
								DATA.driver_details[lineItem] = values[key][index][lineItem];
							} else {
								DATA.driver_details = {};
								DATA.driver_details[lineItem] = values[key][index][lineItem];
							}
						} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(lineItem)) {
							if (NUMBER_KEYS.includes(lineItem)) {
								DATA[lineItem] = Number(values[key][index][lineItem] || FIRST_INDEX);
							} else {
								DATA[lineItem] = values[key][index][lineItem];
							}
						}
					});
				} else if (key === 'cargo_dimension') {
					const cargo_dimensions = values?.[key]?.[zeroth_index];
					const { length, breadth, height, unit } = cargo_dimensions || {};
					DATA[key] = {
						length,
						breadth,
						height,
						unit,
					};
				} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(key)) {
					if (NUMBER_KEYS.includes(key)) {
						DATA[key] = Number(values[key] || FIRST_INDEX);
					} else {
						DATA[key] = values[key];
					}
				}
			});

			return {
				service_id : item,
				data       : DATA,
			};
		});

		return payload;
	}

	return values;
};
export default extraApiPayload;
