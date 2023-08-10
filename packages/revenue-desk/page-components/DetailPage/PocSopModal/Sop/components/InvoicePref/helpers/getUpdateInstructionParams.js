const getUpdateInstructionParams = ({ formValues = {}, data = [] }) => {
	const { invoice_pref = [] } = formValues;

	const FORMAT_DATA = [];

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
				FORMAT_DATA.push({ ...eachService, id: findService?.id });
			}
		}
	});

	if (canUpdate) {
		const params = { sop_update_data: FORMAT_DATA };

		return params;
	}

	return {};
};
export default getUpdateInstructionParams;
