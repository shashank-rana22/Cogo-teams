function getFormattedServices({ data, partner_id = '' }) {
	const { office_details = [] } = data || {};

	const formattedServices = [];

	office_details.forEach((item) => {
		let obj = {
			category       : item?.category,
			sub_category   : item?.sub_category,
			cogo_entity_id : partner_id,
		};

		(item?.cogoport_office_id || []).forEach((office_id) => {
			obj = {
				...obj,
				cogoport_office_id: office_id,
			};

			formattedServices.push(obj);
		});
	});

	return {
		formattedServices,
	};
}

export default getFormattedServices;
