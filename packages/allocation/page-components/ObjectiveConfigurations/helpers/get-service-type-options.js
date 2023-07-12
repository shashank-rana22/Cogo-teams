const SERVICE_TYPE_OPTIONS_MAPPING = {
	ocean: [
		{
			label : 'FCL',
			value : 'fcl',
		},
		{
			label : 'LCL',
			value : 'lcl',
		},
	],
	air: [
		{
			label : 'International',
			value : 'international',
		},
		{
			label : 'Domestic',
			value : 'domestic',
		},
	],
	surface: [
		{
			label : 'FTL',
			value : 'ftl',
		},
		{
			label : 'LTL',
			value : 'ltl',
		},
	],
	haulage: [
		{
			label : 'Trailer',
			value : 'trailer',
		},
		{
			label : 'Rail',
			value : 'rail',
		},
		{
			label : 'Barge',
			value : 'barge',
		},
	],
	rail_domestic: [],
};

const getServiceTypeOptions = ({ shipmentMode }) => SERVICE_TYPE_OPTIONS_MAPPING[shipmentMode] || [];

export default getServiceTypeOptions;
