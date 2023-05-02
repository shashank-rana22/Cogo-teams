import { containerIncludingTasks } from '../controls/containerTasks';

const flatten = (reqObj) => {
	if (typeof reqObj === 'string' || Array.isArray(reqObj)) {
		return reqObj;
	}

	let finalObj = {};

	Object.keys(reqObj || {}).forEach((key) => {
		if (
			typeof reqObj[key] === 'string'
			|| Array.isArray(reqObj[key])
			|| Object.keys(reqObj[key] || {})?.length === 0
		) {
			finalObj = {
				...finalObj,
				[key]: reqObj[key],
			};
		} else if (Object.keys(reqObj[key] || {})?.length) {
			finalObj = {
				...finalObj,
				...(flatten(reqObj[key]) || {}),
			};
		}
	});

	return finalObj;
};

const formatRawValues = (rawValues, task, getApisData) => {
	const values = {};

	Object.keys(rawValues || {}).forEach((key) => {
		if (typeof rawValues[key] === 'string') {
			if (rawValues[key]?.length) values[key] = rawValues[key];
		} else {
			values[key] = rawValues[key];
		}
	});

	const formattedObj = flatten(values);

	if (task?.task === 'add_importer_exporter_poc') {
		return { importer_exporter_poc: formattedObj };
	}

	if (task?.task === 'update_fcl_poc') {
		return { service_provider_poc: formattedObj };
	}

	if ('booking_ref_status' in values) {
		const newValues = JSON.parse(JSON.stringify(values));

		delete newValues?.booking_ref_status;

		if (newValues?.booking_reference_delay_reasons) {
			newValues.booking_reference_delay_reasons = [newValues?.booking_reference_delay_reasons];
		}

		return newValues;
	}

	if (containerIncludingTasks.includes(task?.task)) {
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
	if (
		task?.task === 'update_container_details'
		&& task?.shipment_type === 'fcl_freight_local'
	) {
		return {
			update_data: (rawValues?.update_data || []).map((item) => ({
				id   : item?.id,
				data : {
					...item,
				},
			})),
		};
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

	return values;
};

export default formatRawValues;
