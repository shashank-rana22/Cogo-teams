const freightProvider = {
	lcl_freight                 : 'shipping_line',
	fcl_freight                 : 'shipping_line',
	air_freight                 : 'airline',
	trailer_freight             : '',
	ftl_freight                 : '',
	ltl_freight                 : '',
	fcl_customs                 : 'shipping_line',
	lcl_customs                 : 'shipping_line',
	air_customs                 : 'airline',
	haulage_freight             : 'shipping_line',
	origin_trailer_freight      : '',
	destination_trailer_freight : '',
	origin_ftl_freight          : '',
	destination_ftl_freight     : '',
	origin_ltl_freight          : '',
	destination_ltl_freight     : '',
	origin_fcl_customs          : 'shipping_line',
	destination_fcl_customs     : 'shipping_line',
	origin_lcl_customs          : 'shipping_line',
	destination_lcl_customs     : 'shipping_line',
	origin_air_customs          : 'airline',
	destination_air_customs     : 'airline',
};

const titleHandle = (type) => {
	if (type === 'fcl_freight') {
		return 'FCL Freight';
	}
	if (type === 'air_freight') {
		return 'Air Freight';
	}
	return 'Freight';
};

const shippingLine = (search_type, rate) => {
	const name = (rate[freightProvider[search_type]] || {}).short_name;
	const shipping_line = name ? `(${name})` : '';
	const title = titleHandle(search_type);
	return `${title} ${shipping_line}`;
};

export default shippingLine;
