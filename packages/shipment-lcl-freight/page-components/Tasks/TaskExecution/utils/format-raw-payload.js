const formatRawValues = (rawValues, task) => {
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

	return values;
};

export default formatRawValues;
