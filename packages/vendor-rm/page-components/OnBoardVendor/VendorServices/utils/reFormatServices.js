function reFormatServices({
	services,
}) {
	const formattedServicesObj = (services || []).reduce((accumulater, service) => {
		const key = `${service.category}-${service.sub_category}`;
		if (!accumulater[key]) {
			// eslint-disable-next-line no-param-reassign
			accumulater[key] = {
				category           : service.category,
				sub_category       : service.sub_category,
				cogoport_office_id : [],
			};
		}
		accumulater[key].cogoport_office_id.push(service.cogoport_office_id);
		return accumulater;
	}, {});

	return {
		reformattedDataFromApi: {
			services: Object.values(formattedServicesObj),
		},
	};
}

export default reFormatServices;
