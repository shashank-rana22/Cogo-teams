const controls = [
	{
		name           : 'serviceType',
		type           : 'select',
		placeholder    : 'Service',
		span           : 1,
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{ label: 'FCL Freight', value: 'fcl_freight' },
			{ label: 'LCL Freight', value: 'lcl_freight' },
			{ label: 'Air Freight', value: 'air_freight' },
			{ label: 'FTL Freight', value: 'ftl_freight' },
			{ label: 'LTL Freight', value: 'ltl_freight' },
			{ label: 'Haulage Freight', value: 'haulage_freight' },
			{ label: 'Trailer Freight', value: 'trailer_freight' },
			{ label: 'FCL Customs', value: 'fcl_customs' },
			{ label: 'LCL Customs', value: 'lcl_customs' },
			{ label: 'Air Customs', value: 'air_customs' },
		],
	},
	{
		name           : 'jobState',
		type           : 'select',
		placeholder    : 'Job Status',
		span           : 3,
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{
				label : 'Open Jobs',
				value : 'OPEN',
			},
			{
				label : 'Operationally Closed',
				value : 'OPR_CLOSED',
			},
			{
				label : 'Closed Jobs',
				value : 'CLOSED',
			},
		],

	},
];

export default controls;
