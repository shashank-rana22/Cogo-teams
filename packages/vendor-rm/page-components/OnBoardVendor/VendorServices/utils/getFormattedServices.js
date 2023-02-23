function getFormattedServices({ data, partner_id = '' }) {
	const { services = [] } = data || {};

	const formattedServices = [];

	services.forEach((item) => {
		const {
			category = '',
			sub_category = '',
			cogoport_office_id = '',
		} = item || {};

		const obj = {
			category,
			sub_category,
			cogo_entity_id: partner_id,
			cogoport_office_id,
		};

		formattedServices.push(obj);
	});

	return {
		formattedServices,
	};
}

export default getFormattedServices;
