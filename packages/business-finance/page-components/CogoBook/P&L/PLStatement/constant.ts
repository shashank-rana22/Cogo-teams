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
			{ label: 'Ocean ( IE,CP,ES )', value: 'Ocean', name: 'Ocean' },
			{ label: 'Air ( IE,CP,ES )', value: 'Air', name: 'Air' },
			{ label: 'Surface ( IE,CP,ES )', value: 'Surface', name: 'Surface' },
			{ label: 'Rail ( IE,CP,ES )', value: 'Rail', name: 'Rail' },
		];
	}
	if (chip === 'Service') {
		return [
			{ label: 'Ocean (FCL/LCL Exports, FCL/LCL Imports ETC.)', value: 'Ocean', name: 'Ocean' },
			{ label: 'Air (Imports,Exports, Customs, transshipment)', value: 'Air', name: 'Air' },
			{ label: 'Surface (FTL,LTL,PTL)', value: 'Surface', name: 'Surface' },
			{ label: 'Rail (Domestic)', value: 'Rail', name: 'Rail' },
		];
	}
	return [
		{ label: 'Ocean/Air/Surface/Rail', value: 'segment', name: 'segment' },
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
export const entityMapping = {
	'6fd98605-9d5d-479d-9fac-cf905d292b88' : 101,
	'c7e1390d-ec41-477f-964b-55423ee84700' : 201,
	'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1' : 301,
	'04bd1037-c110-4aad-8ecc-fc43e9d4069d' : 401,
	'b67d40b1-616c-4471-b77b-de52b4c9f2ff' : 501,
};

export const entityMappingData = {
	101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
	301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
	401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
	501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
};
