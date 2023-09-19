const PORT_PAIR_SERVICES = [
	'air_freight',
	'fcl_freight',
	'lcl_freight',
	'ftl_freight',
	'ltl_freight',
	'haulage_freight',
	'rail_domestic_freight',
];

const SERVICES = {
	fcl_freight : 'Shipping lines',
	air_freight : 'Airlines',
};

const LOGO_MAPPING = {
	fcl_freight : 'shipping_line_logo',
	air_freight : 'airline_logo',
};

const NAME_MAPPING = {
	fcl_freight : 'shipping_line_name',
	air_freight : 'airline_name',
};

const APPROVAL_STATUS = {
	pending_approval   : 'pending',
	more_info_required : 'rejected',
	active             : 'approved',
	inactive           : 'rejected',
};

export {
	PORT_PAIR_SERVICES,
	SERVICES,
	LOGO_MAPPING,
	NAME_MAPPING,
	APPROVAL_STATUS,
};
export default PORT_PAIR_SERVICES;
