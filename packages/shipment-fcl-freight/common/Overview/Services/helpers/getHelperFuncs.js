const helperFuncs = (servicesList, possibleServices) => {
	const serviceObj = {
		originServices      : [],
		mainServices        : [],
		destinationServices : [],
	};

	const checkIfServiceAlreadyPresent = (servicesArray, service) => {
		let canPushService = true;
		if (servicesArray[service.service_type]?.length) {
			(servicesArray[service?.service_type] || []).forEach((obj) => {
				if (obj.id === service.id) {
					canPushService = false;
				}
			});
		}
		return canPushService;
	};

	const classifyTradeTypeBasedService = (serviceToIterate) => {
		let isServiceAlreadyAdded = false;

		(servicesList || []).forEach((service) => {
			if (service?.service_type === serviceToIterate.service_type) {
				isServiceAlreadyAdded = true;
				if (service?.trade_type === 'export') {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.originServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.originServices).includes(service?.service_type)) {
							(serviceObj.originServices[service?.service_type]).push({
								...(serviceObj.originServices[service?.service_type]),
								display_name: serviceToIterate.display_name,
							});
						} else {
							(serviceObj.originServices)[service?.service_type] = [{
								...service,
								display_name: serviceToIterate.display_name,
							}];
						}
					}
				} else 	if (service?.trade_type === 'import') {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.destinationServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.originServices).includes(service?.service_type)) {
							(serviceObj.destinationServices[service?.service_type]).push({
								...(serviceObj.destinationServices[service?.service_type]),
								display_name: serviceToIterate.display_name,
							});
						} else {
							(serviceObj.destinationServices)[service?.service_type] = [{
								...service,
								display_name: serviceToIterate.display_name,
							}];
						}
					}
				} else {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.destinationServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.mainServices).includes(service?.service_type)) {
							(serviceObj.mainServices[service?.service_type]).push({
								...(serviceObj.mainServices[service?.service_type]),
								display_name: serviceToIterate.display_name,
							});
						} else {
							(serviceObj.mainServices)[service?.service_type] = [{
								...service,
								display_name: serviceToIterate.display_name,
							}];
						}
					}
				}
			}
		});

		if (!isServiceAlreadyAdded) {
			if (serviceToIterate.trade_type === 'export') {
				(serviceObj.originServices)[serviceToIterate.service_type] = [{
					display_name: serviceToIterate.display_name,
				}];
			} else if (serviceToIterate.trade_type === 'import') {
				(serviceObj.destinationServices)[serviceToIterate.service_type] = [{
					display_name: serviceToIterate.display_name,
				}];
			} else {
				(serviceObj.mainServices)[serviceToIterate.service_type] = [{
					display_name: serviceToIterate.display_name,
				}];
			}
		}
	};

	possibleServices.forEach((service) => {
		if ('mainServices' in service) {
			(service.mainServices).forEach((singleService) => {
				classifyTradeTypeBasedService(singleService);
			});
		} else {
			classifyTradeTypeBasedService(service);
		}
	});

	return {
		serviceObj,
	};
};

export default helperFuncs;
