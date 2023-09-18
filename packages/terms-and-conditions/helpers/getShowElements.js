const tradeTypeAbsentForServices = [
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

const getShowElements = ({ service = '', trade_type = '', controls = [] }) => {
	const showElements = controls.reduce((pv, cv) => {
		const { name = '' } = cv || {};

		let showElement = true;
		if (
			(name === 'shipping_line_id' && service !== 'fcl_freight')
			|| (name === 'airline_id' && service !== 'air_freight')
		) {
			showElement = false;
		}

		if (name === 'trade_type' && tradeTypeAbsentForServices.includes(service)) {
			showElement = false;
		}

		if (name === 'country_id' && !['import', 'export'].includes(trade_type)) {
			showElement = false;
		}

		return { ...pv, [name]: showElement };
	}, {});
	return showElements;
};

export default getShowElements;
