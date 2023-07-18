const TARIFF_RATE = {
	name        : 'tariff_rate',
	type        : 'number',
	label       : 'Tariff Rate',
	placeholder : 'Enter Tariff Rate',
	span        : 5,
};

const getOtherControls = (service_type, trade_type) => {
	const CONTROLS = [];
	if (service_type === 'air_freight_service' && trade_type === 'export') {
		CONTROLS.push(TARIFF_RATE);
	}

	return CONTROLS;
};

export default getOtherControls;
