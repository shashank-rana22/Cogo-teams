import possibleServices from '../../../configurations/possible-full-route.json';

const TRADE_TYPE_BASED_SERVICE_TYPE = {
	import : 'air_freight_local_service_import',
	export : 'air_freight_local_service_export',
};

const TARGET_KEY_MAPPING = {
	import : 'destinationServices',
	export : 'originServices',
};

const checkIfServiceAlreadyPresent = (servicesObj, service) => {
	if (service?.service_type in servicesObj) {
		return !(servicesObj[service.service_type] || []).some((obj) => obj.id === service.id);
	}
	return true;
};

const classifyTradeTypeBasedService = ({
	servicesList = [],
	serviceToIterate = {},
	targetServiceObj = {},
	targetUpsellServices = [],
} = {}) => {
	const { service_type, trade_type, display_label, is_main } = serviceToIterate;

	const matchingService = servicesList.find((service) => {
		const { service_type: serviceType, trade_type: tradeType } = service || {};

		return service_type === serviceType && (trade_type === tradeType || serviceType === 'air_freight_service');
	});

	const newTargetObj = targetServiceObj;

	if (matchingService) {
		const serviceType = is_main && trade_type in TRADE_TYPE_BASED_SERVICE_TYPE
			? TRADE_TYPE_BASED_SERVICE_TYPE[trade_type]
			: service_type;

		const canPushService = checkIfServiceAlreadyPresent(
			newTargetObj,
			{ ...matchingService, service_type: serviceType },
		);

		if (canPushService) {
			const serviceObj = { ...matchingService, display_label };

			if (serviceType in newTargetObj) {
				(newTargetObj[serviceType]).push(serviceObj);
			} else {
				newTargetObj[serviceType] = [serviceObj];
			}
		}
	} else {
		targetUpsellServices.push(serviceToIterate);
	}

	return { targetServiceObj: newTargetObj, targetUpsellServices };
};

const helperFuncs = (servicesList) => {
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

	possibleServices.forEach((serviceToIterate) => {
		const { trade_type, is_main } = serviceToIterate;

		const key = is_main ? 'mainServices' : TARGET_KEY_MAPPING[trade_type];

		const { targetServiceObj, targetUpsellServices } = classifyTradeTypeBasedService({
			servicesList,
			serviceToIterate,
			targetServiceObj     : serviceObj[key],
			targetUpsellServices : upsellServices[key],
		});
		serviceObj[key] = targetServiceObj;
		upsellServices[key] = targetUpsellServices;
	});

	return {
		serviceObj,
		upsellServices,
	};
};

export default helperFuncs;
