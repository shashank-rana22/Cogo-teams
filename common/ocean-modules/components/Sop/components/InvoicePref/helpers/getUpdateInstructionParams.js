const getUpdateInstructionParams = ({ formValues = {}, data = [] }) => {
	const { invoice_pref = [] } = formValues;
	const formatData = [];
	let canUpdate = true;

	(invoice_pref || []).forEach((eachService) => {
		if (canUpdate) {
			const findService = (data || []).find(
				(item) => item?.sop_detail?.invoice_preference_service
                    === eachService?.invoice_preference_service,
			);

			if (!findService?.id) {
				canUpdate = false;
			} else {
				formatData.push({ ...eachService, id: findService?.id });
			}
		}
	});

	if (canUpdate) {
		const params = { sop_update_data: formatData };
		return params;
	}
	return {};
};
export default getUpdateInstructionParams;
