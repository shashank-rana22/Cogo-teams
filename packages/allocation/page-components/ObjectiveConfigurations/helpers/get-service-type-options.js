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
			value : 'air_freight', // 'air_international'
		},
		{
			label : 'Domestic',
			value : 'domestic_air_freight',
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
			value : 'rail_freight', // 'haulage_freight',
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
