const showElements = (serviceType, type) => {
	const isPortService = ['fcl_freight', 'lcl_freight'].includes(serviceType);
	const isAirService = serviceType?.includes('air');
	const isCustomService = serviceType?.includes('customs');
	const isTradeLane =		(type === 'missing_rates'
			&& [
				'air_freight',
				'domestic_air_freight',
				'lcl_freight',
				'fcl_freight',
				'air_customs',
				'lcl_customs',
			].includes(serviceType))
		|| (type === 'disliked_rates'
			&& ['lcl_freight', 'lcl_customs', 'fcl_freight', 'fcl_customs'].includes(
				serviceType,
			));
	const isTradeType =		(type === 'missing_rates' && serviceType === 'air_freight')
		|| (type === 'disliked_rates'
			&& ['air_freight', 'air_customs', 'fcl_customs'].includes(serviceType));
	return {
		location_id            : serviceType === 'lcl_customs',
		port_id                : serviceType === 'fcl_customs',
		airport_id             : serviceType === 'air_customs',
		origin_airport_id      : !isCustomService && isAirService,
		destination_airport_id : !isCustomService && isAirService,
		origin_port_id         : isPortService,
		destination_port_id    : isPortService,
		origin_location_id     : !isAirService && !isPortService && !isCustomService,
		destination_location_id:
			!isAirService && !isPortService && !isCustomService,
		trade_id             : isTradeLane && isCustomService,
		origin_trade_id      : isTradeLane && !isCustomService,
		destination_trade_id : isTradeLane && !isCustomService,
		trade_type           : isTradeType,
	};
};
export default showElements;
