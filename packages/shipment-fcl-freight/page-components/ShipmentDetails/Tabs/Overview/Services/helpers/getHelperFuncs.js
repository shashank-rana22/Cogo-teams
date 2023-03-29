const helperFuncs = (servicesList, possibleServices) => {
	const serviceObj = {
		originServices      : [],
		mainServices        : [],
		destinationServices : [],
	};

	const upsellServices = {
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
				if (service?.trade_type === 'export' && !serviceToIterate.is_main) {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.originServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.originServices).includes(service?.service_type)) {
							(serviceObj.originServices[service?.service_type]).push({
								...(serviceObj.originServices[service?.service_type]),
								display_label : serviceToIterate.display_label,
								trade_type    : serviceToIterate.trade_type,
							});
						} else {
							(serviceObj.originServices)[service?.service_type] = [{
								...service,
								display_label: serviceToIterate.display_label,
							}];
						}
					}
				} else 	if (service?.trade_type === 'import' && !serviceToIterate.is_main) {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.destinationServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.destinationServices).includes(service?.service_type)) {
							(serviceObj.destinationServices[service?.service_type]).push({
								...(serviceObj.destinationServices[service?.service_type]),
								display_label: serviceToIterate.display_label,
							});
						} else {
							(serviceObj.destinationServices)[service?.service_type] = [{
								...service,
								display_label: serviceToIterate.display_label,
							}];
						}
					}
				} else {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.destinationServices, service);

					if (canPushService) {
						if (Object.keys(serviceObj.mainServices).includes(service?.service_type)) {
							(serviceObj.mainServices[serviceToIterate.service_type]).push({
								...service,
								display_label: serviceToIterate.display_label,
							});
						} else {
							(serviceObj.mainServices)[service?.service_type] = [{
								...service,
								display_label: serviceToIterate.display_label,
							}];
						}
					}
				}
			}
		});

		if (!isServiceAlreadyAdded) {
			if (serviceToIterate.trade_type === 'export' && !serviceToIterate?.is_main) {
				(upsellServices.originServices).push({
					...serviceToIterate,
				});
			} else if (serviceToIterate.trade_type === 'import' && !serviceToIterate?.is_main) {
				(upsellServices.destinationServices).push({
					...serviceToIterate,
				});
			} else {
				(upsellServices.mainServices).push({
					...serviceToIterate,
				});
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
		upsellServices,
	};
};

export default helperFuncs;
