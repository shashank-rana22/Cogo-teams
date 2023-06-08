import possibleServices from '../../../../configs/possible-full-route.json';

const classifyTradeTypeBasedService = ({
	servicesList = [],
	serviceToIterate = {},
	targetServiceObj = {},
} = {}) => {
	const { service_type, trade_type, display_label } = serviceToIterate;

	const matchingService = servicesList.find((service) => {
		const { service_type: serviceType, trade_type: tradeType } = service || {};

		return service_type === serviceType && (trade_type === tradeType || serviceType === 'haulage_freight_service');
	});

	const newTargetObj = targetServiceObj;

	if (matchingService) {
		const serviceType = service_type;

		const serviceObj = { ...matchingService, display_label };

		if (serviceType in newTargetObj) {
			(newTargetObj[serviceType]).push(serviceObj);
		} else {
			newTargetObj[serviceType] = [serviceObj];
		}
	}

	return { targetServiceObj: newTargetObj };
};

const helperFuncs = (servicesList) => {
	const serviceObj = {
		mainServices: {},
	};

	possibleServices.forEach((serviceToIterate) => {
		const { targetServiceObj } = classifyTradeTypeBasedService({
			servicesList,
			serviceToIterate,
			targetServiceObj: serviceObj.mainServices,
		});
		serviceObj.mainServices = targetServiceObj;
	});

	return {
		serviceObj,
	};
};

export default helperFuncs;
