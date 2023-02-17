function getFormattedServices({ data, partner_id = '' }) {
	const { office_details = [] } = data || {};

	const formattedServices = [];

	office_details.forEach((item) => {
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
