export const optionsPeriod = [
	{ label: 'Last Month', value: 'lastMonth' },
	{ label: 'Last Quarter', value: 'lastQuarter' },
];
export const optionsCheck = [
	{ name: 'all', value: 'all', label: 'All' },
	{ name: 'nonZero', value: 'nonZero', label: 'Non Zero' },
];

export const optionsPills = [
	{ key: 'Segment', children: 'Segment' },
	{ key: 'Service', children: 'Service' },
];
export const optionsRadio = (chip:string) => {
	if (chip === 'DemandChannel') {
		return [
			{ label: 'Ocean ( IE,CP,ES )', value: 'Ocean' },
			{ label: 'Air ( IE,CP,ES )', value: 'Air' },
			{ label: 'Surface ( IE,CP,ES )', value: 'Surface' },
			{ label: 'Rail ( IE,CP,ES )', value: 'Rail' },
		];
	}
	if (chip === 'Service') {
		return [
			{ label: 'Ocean (FCL/LCL Exports, FCL/LCL Imports ETC.)', value: 'Ocean' },
			{ label: 'Air (Imports,Exports, Customs, transshipment)', value: 'Air' },
			{ label: 'Surface (FTL,LTL,PTL)', value: 'Surface' },
			{ label: 'Rail (Domestic)', value: 'Rail' },
		];
	}
	return [
		{ label: 'Ocean/Air/Surface/Rail', value: 'segment' },
	];
};

export const mappingData = (filters) => {
	const { monthTo = '', monthFrom = '' } = filters || {};
	return {
		OFF: {
			Ocean: [
				{
					key  : 'fclImports',
					name : 'Fcl Imports',
				},
				{
					key  : 'fclExports',
					name : 'Fcl Exports',
				},
				{
					key  : 'lclImports',
					name : 'Lcl Imports',
				},
				{
					key  : 'lclExports',
					name : 'Lcl Exports',
				},
				{
					key  : 'oceanCustoms',
					name : 'Ocean Customs',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
			Air: [
				{
					key  : 'airImports',
					name : 'Air Import',
				},
				{
					key  : 'airExports',
					name : 'Air Export',
				},
				{
					key  : 'airCustoms',
					name : 'Air Customs ',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
			Surface: [
				{
					key  : 'ftl',
					name : 'Ftl ',
				},
				{
					key  : 'ltl',
					name : 'Ltl ',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
			segment: [
				{
					key  : 'ocean',
					name : 'Ocean',
				},
				{
					key  : 'air',
					name : 'Air',
				},
				{
					key  : 'surface',
					name : 'Surface',
				},
				{
					key  : 'rail',
					name : 'Rail',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
			nothing: [
				{
					key  : 'ocean',
					name : 'Ocean',
				},
				{
					key  : 'air',
					name : 'Air',
				},
				{
					key  : 'surface',
					name : 'Surface',
				},
				{
					key  : 'rail',
					name : 'Rail',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
			Rail: [
				{
					key  : 'railDomestic',
					name : 'Rail Domestic',
				},
				{
					key  : 'total',
					name : 'Total',
				},
			],
		},
		ON: [
			{
				key  : 'total',
				name : monthTo,
			},
			{
				key  : 'total',
				name : monthFrom,
			},
		],

	};
};
