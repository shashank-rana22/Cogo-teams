const checkIfServiceAlreadyPresent = (servicesObj, service) => {
	if (service?.service_type in servicesObj) {
		return !(servicesObj[service.service_type] || []).some((obj) => obj.id === service.id);
	}
	return true;
};

const helperFuncs = (servicesList, possibleServices) => {
	const serviceObj = {
		mainServices: {},
	};

	const classifyTradeTypeBasedService = (serviceToIterate) => {
		(servicesList || []).forEach((service) => {
			const { service_type, trade_type } = service || {};
			if (service_type === serviceToIterate.service_type
				&& ((serviceToIterate.trade_type === trade_type))) {
				const canPushService = checkIfServiceAlreadyPresent(
					serviceObj.mainServices,
					{ ...service, service_type },
				);

				if (canPushService) {
					if (service_type in serviceObj.mainServices) {
						(serviceObj.mainServices[service_type]).push({
							...service,
							display_label: serviceToIterate.display_label,
						});
					} else {
						(serviceObj.mainServices)[service_type] = [{
							...service,
							display_label: serviceToIterate.display_label,
						}];
					}
				}
			}
		});
	};

	possibleServices.forEach((service) => {
		classifyTradeTypeBasedService(service);
	});

	return {
		serviceObj,
	};
};

export default helperFuncs;
