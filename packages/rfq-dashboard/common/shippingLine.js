import { getByKey } from '@cogoport/utils';

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

const TITLE_MAPPING = {
	fcl_freight : 'FCL Freight',
	air_freight : 'AIR Freight',
};

const shippingLine = (search_type, rate) => {
	const name = getByKey(rate, `${freightProvider[search_type]}.short_name`);
	const shipping_line = name ? `(${name})` : '';
	const title = TITLE_MAPPING[search_type];
	return `${title} ${shipping_line}`;
};

export default shippingLine;
