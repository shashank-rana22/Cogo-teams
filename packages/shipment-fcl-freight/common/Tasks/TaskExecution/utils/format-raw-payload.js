import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
			|| Object.keys(reqObj[key] || {})?.length === GLOBAL_CONSTANTS.zeroth_index
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
	const VALUES = {};

	Object.keys(rawValues || {}).forEach((key) => {
		if (typeof rawValues[key] === 'string') {
			if (rawValues[key]?.length) VALUES[key] = rawValues[key];
		} else {
			VALUES[key] = rawValues[key];
		}
	});

	const formattedObj = flatten(VALUES);

	if (task?.task === 'add_importer_exporter_poc') {
		return { importer_exporter_poc: formattedObj };
	}

	if (task?.task === 'update_fcl_poc') {
		return { service_provider_poc: formattedObj };
	}

	if ('booking_ref_status' in VALUES) {
		const newValues = JSON.parse(JSON.stringify(VALUES));

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
						...(VALUES || {}),
					},
				}),
			),
		};
	}

	if (VALUES?.authorize_letter_and_dpd_code) {
		const newRawValues = JSON.parse(JSON.stringify(VALUES));

		delete newRawValues?.authorize_letter_and_dpd_code;

		return {
			...newRawValues,
			dpd_code  : VALUES?.authorize_letter_and_dpd_code?.[GLOBAL_CONSTANTS.zeroth_index]?.dpd_code,
			documents : (VALUES?.authorize_letter_and_dpd_code || []).map(() => ({
				document_type: 'authorize_letter',
				url:
				VALUES?.authorize_letter_and_dpd_code?.[GLOBAL_CONSTANTS.zeroth_index]?.authority_letter_custom,
			})),
		};
	}

	if (task.task === 'mark_container_gated_out') {
		return {
			update_data: rawValues?.containers_gated_out?.map((i) => ({
				id   : i?.id,
				data : {
					gated_out_at: i?.gated_out_at,
				},
			})),
		};
	}

	return VALUES;
};

export default formatRawValues;
