function reFormatServices({
	services,
}) {
	const formattedServicesObj = (services || []).reduce((acc, service) => {
		const key = `${service.category}-${service.sub_category}`;
		if (!acc[key]) {
			acc[key] = {
				category           : service.category,
				sub_category       : service.sub_category,
				cogoport_office_id : [],
			};
		}
		acc[key].cogoport_office_id.push(service.cogoport_office_id);
		return acc;
	}, {});

	return {
		reformattedDataFromApi: {
			services: Object.values(formattedServicesObj),
		},
	};
}

export default reFormatServices;
