function getFormattedServices({ data, partner_id = '' }) {
	const { services = [] } = data || {};

	const formattedServices = [];

	services.forEach((item) => {
		const {
			category = '',
			sub_category = '',
			cogoport_office_id = [],
		} = item || {};

		(cogoport_office_id || []).forEach((office_id) => {
			const obj = {
				category,
				sub_category,
				cogoport_office_id : office_id,
				cogo_entity_id     : partner_id,
			};
			formattedServices.push(obj);
		});
	});

	return {
		formattedServices,
	};
}

export default getFormattedServices;
