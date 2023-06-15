const IsAllServicesTaken = (
	servicesList,
	selectedParties,
	shipment_data,
	allServiceLineitemsCount,
) => {
	const shipmentMainService = `${shipment_data?.shipment_type}_service`;

	let allServicesTaken = [];
	selectedParties.forEach((party) => {
		allServicesTaken.push(...(party.services || []));
	});

	allServicesTaken = allServicesTaken.map((service) => service.service_id);

	let mainServices = [];
	if (shipment_data?.state === 'cancelled') {
		mainServices = servicesList?.filter(
			(service) => service?.service_type === shipmentMainService,
		);
	} else {
		mainServices = servicesList?.filter(
			(service) => service?.service_type !== 'subsidiary_service',
		);
	}

	let isAllMainServicesTaken = true;
	const notTaken = [];

	mainServices.forEach((service) => {
		if (!allServicesTaken.includes(service.id)) {
			isAllMainServicesTaken = false;
			notTaken.push(service.service_type);
		}
	});

	if (allServicesTaken.length !== allServiceLineitemsCount) {
		isAllMainServicesTaken = false;
	}
	return { isAllMainServicesTaken, notTaken };
};

export default IsAllServicesTaken;