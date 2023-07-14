const getUserDetails = ({ data = [] }) => {
	const details = (data || []).map((poc) => {
		const obj = {
			name          : poc?.name,
			email         : poc?.email,
			mobile_number : `${poc?.mobile_country_code} ${poc?.mobile_number}`,

			alternate_mobile_number: (poc?.alternate_mobile_country_code && poc?.alternate_mobile_number)
				? `${poc?.alternate_mobile_country_code} ${poc?.alternate_mobile_number}` : '__',

			whatsapp_number: (poc?.whatsapp_country_code && poc?.whatsapp_number)
				? `${poc?.whatsapp_country_code} ${poc?.whatsapp_number}` : '__',

			work_scopes: poc?.work_scopes,
		};

		return obj;
	});

	return details;
};

export default getUserDetails;
