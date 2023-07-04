const NOT_FOUND_INDEX = -1;

const getCreateInstructionParams = ({ formValues, data }) => {
	const PARAMS = { instruction: 'invoice_preference' };

	const sop_instructions = formValues?.invoice_pref || [];

	let canAdd = true;

	(sop_instructions || []).forEach((item) => {
		if (canAdd) {
			const find = (data || []).findIndex(
				(currentData) => currentData?.sop_detail?.invoice_preference_service
				=== item?.invoice_preference_service,
			);

			if (find !== NOT_FOUND_INDEX) { canAdd = false; }
		}
	});

	if (canAdd) {
		PARAMS.sop_instructions = formValues?.invoice_pref || [];
		return PARAMS;
	}

	return {};
};
export default getCreateInstructionParams;
