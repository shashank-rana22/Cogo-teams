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
	fcl_freight: {
		preffered : 'Shipping lines',
		logo      : 'shipping_line_logo',
		name      : 'shipping_line_name',
	},
	air_freight: {
		preffered : 'Airlines',
		logo      : 'airline_logo',
		name      : 'airline_name',
	},
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
	APPROVAL_STATUS,
};
export default PORT_PAIR_SERVICES;
