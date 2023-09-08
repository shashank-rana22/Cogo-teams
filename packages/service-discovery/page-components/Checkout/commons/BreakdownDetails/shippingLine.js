const shippingLine = (search_type, rate) => {
	const FREIGHT_PROVIDER = {
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
	const name = (rate[FREIGHT_PROVIDER[search_type]] || {}).short_name;

	const shipping_line = name ? `(${name})` : '';

	const titleHandle = () => {
		if (search_type === 'fcl_freight') {
			return 'Ocean Freight';
		}
		if (search_type === 'air_freight') {
			return 'Air Freight';
		}
		return 'Freight';
	};

	const title = titleHandle();

	return `${title} ${shipping_line}`;
};

export default shippingLine;
