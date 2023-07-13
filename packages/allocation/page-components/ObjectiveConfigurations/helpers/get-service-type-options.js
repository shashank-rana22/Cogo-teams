const SERVICE_TYPE_OPTIONS_MAPPING = {
	ocean: [
		{
			label : 'FCL',
			value : 'fcl_freight',
		},
		{
			label : 'LCL',
			value : 'lcl_freight',
		},
	],
	air: [
		{
			label : 'International',
			value : 'air_international',
		},
		{
			label : 'Domestic',
			value : 'air_domestic',
		},
	],
	surface: [
		{
			label : 'FTL',
			value : 'ftl_freight',
		},
		{
			label : 'LTL',
			value : 'ltl_freight',
		},
	],
	haulage: [
		{
			label : 'Trailer',
			value : 'trailer_freight',
		},
		{
			label : 'Rail',
			value : 'haulage_freight',
		},
		{
			label : 'Barge',
			value : 'barge_freight',
		},
	],
	rail: [],
};

const getServiceTypeOptions = ({ watchShipmentMode }) => SERVICE_TYPE_OPTIONS_MAPPING[watchShipmentMode] || [];

export default getServiceTypeOptions;
