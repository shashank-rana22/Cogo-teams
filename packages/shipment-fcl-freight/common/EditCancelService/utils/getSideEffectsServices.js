const NOT_CANCEL_ID_STATUS = ['complete', 'cancelled'];

export function getSideEffectsServices({ servicesList = [], trade_type = '', service_type = '' }) {
	let sideEffectServices = [];

	if (service_type === 'fcl_freight_service') {
		sideEffectServices = (servicesList || []).filter(
			(item) => item?.service_type === service_type,
		);
	} else if (service_type === 'haulage_freight_service') {
		sideEffectServices = (servicesList || []).filter(
			(item) => ['trailer_freight_service', 'haulage_freight_service'].includes(
				item?.service_type,
			) && item?.trade_type === trade_type,
		);
	} else {
		sideEffectServices = (servicesList || []).filter(
			(item) => item?.service_type === service_type && item?.trade_type === trade_type,
		);
	}

	sideEffectServices = sideEffectServices.filter((service) => !NOT_CANCEL_ID_STATUS.includes(service.status));

	return sideEffectServices;
}
