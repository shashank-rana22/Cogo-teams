import containerDetailTasks from '../configs/containerDetailTasks';
import truckDetailTasks from '../configs/truckDetailTasks';

const formatRawValues = (rawValues, task, getApisData) => {
	const values = {};

	Object.keys(rawValues || {}).forEach((key) => {
		if (typeof rawValues[key] === 'string') {
			if (rawValues[key]?.length) values[key] = rawValues[key];
		} else {
			values[key] = rawValues[key];
		}
	});

	if ('booking_ref_status' in values) {
		const newValues = JSON.parse(JSON.stringify(values));

		delete newValues?.booking_ref_status;

		if (newValues?.booking_reference_delay_reasons) {
			newValues.booking_reference_delay_reasons = [newValues?.booking_reference_delay_reasons];
		}

		return newValues;
	}

	if (values?.authorize_letter_and_dpd_code) {
		const newRawValues = JSON.parse(JSON.stringify(values));

		delete newRawValues?.authorize_letter_and_dpd_code;

		return {
			...newRawValues,
			dpd_code  : values?.authorize_letter_and_dpd_code?.[0]?.dpd_code,
			documents : (values?.authorize_letter_and_dpd_code || []).map(() => ({
				document_type : 'authorize_letter',
				url           : values?.authorize_letter_and_dpd_code?.[0]?.authority_letter_custom,
			})),
		};
	}

	if (truckDetailTasks.includes(task?.task)) {
		return {
			update_data: (getApisData?.list_shipment_truck_details || []).map(
				(item) => ({
					id   : item.id,
					data : { ...(values || {}) },
				}),
			),
		};
	}

	if (containerDetailTasks.includes(task?.task)) {
		return {
			update_data: (getApisData?.list_shipment_container_details || []).map(
				(item) => ({
					id   : item?.id,
					data : {
						container_number: item?.container_number,
						...(values || {}),
					},
				}),
			),
		};
	}

	if (task.task === 'container_details_update') {
		const { update_data = [] } = values;
		return {
			update_data: (getApisData?.list_shipment_container_details || []).map(
				(item, index) => {
					const {
						container_number = '',
						estimated_departure,
						estimated_arrival,
					} = update_data?.[index] || [];
					return {
						id   : item?.id,
						data : {
							container_number,
							estimated_departure,
							estimated_arrival,
						},
					};
				},
			),
		};
	}

	return values;
};

export default formatRawValues;
