const checkIfServiceAlreadyPresent = (servicesObj, service) => {
	if (service?.service_type in servicesObj) {
		return !(servicesObj[service.service_type] || []).some((obj) => obj.id === service.id);
	}
	return true;
};

const helperFuncs = (servicesList, possibleServices) => {
	const serviceObj = {
		originServices      : {},
		mainServices        : {},
		destinationServices : {},
	};

	const upsellServices = {
		originServices      : [],
		mainServices        : [],
		destinationServices : [],
	};

	const classifyTradeTypeBasedService = (serviceToIterate) => {
		let isServiceAlreadyAdded = false;

		(servicesList || []).forEach((service) => {
			const { service_type, trade_type } = service || {};
			if (service_type === serviceToIterate.service_type
				&& ((serviceToIterate.trade_type === trade_type))) {
				isServiceAlreadyAdded = true;

				if (trade_type === 'export' && !serviceToIterate.is_main) {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.originServices, service);

					if (canPushService) {
						if (service_type in serviceObj.originServices) {
							(serviceObj.originServices[service_type]).push({
								...service,
								display_label: serviceToIterate.display_label,
							});
						} else {
							serviceObj.originServices[service_type] = [{
								...service,
								display_label: serviceToIterate.display_label,
							}];
						}
					}
				} else if (trade_type === 'import' && !serviceToIterate.is_main) {
					const canPushService = 	checkIfServiceAlreadyPresent(serviceObj.destinationServices, service);

					if (canPushService) {
						if (service_type in serviceObj.destinationServices) {
							(serviceObj.destinationServices[service_type]).push({
								...service,
								display_label: serviceToIterate.display_label,
							});
						} else {
							serviceObj.destinationServices[service_type] = [{
								...service,
								display_label: serviceToIterate.display_label,
							}];
						}
					}
				} else {
					// const serviceType = trade_type in tradeTypeBasedServiceType
					// 	? tradeTypeBasedServiceType[trade_type]
					// 	: service_type;

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
		classifyTradeTypeBasedService(service);
	});

	return {
		serviceObj,
		upsellServices,
	};
};

export default helperFuncs;
