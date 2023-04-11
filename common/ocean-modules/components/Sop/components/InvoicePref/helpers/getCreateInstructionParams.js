const getCreateInstructionParams = ({ formValues, data }) => {
	const params = { instruction: 'invoice_preference' };
	const sop_instructions = formValues?.invoice_pref || [];
	let canAdd = true;

	(sop_instructions || []).forEach((item) => {
		if (canAdd) {
			const find = (data || []).findIndex(
				(currentData) => currentData?.sop_detail?.invoice_preference_service
				=== item?.invoice_preference_service,
			);

			if (find !== -1) { canAdd = false; }
		}
	});

	if (canAdd) {
		params.sop_instructions = formValues?.invoice_pref || [];
		return params;
	}
	return {};
};
export default getCreateInstructionParams;
