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
	function convertDateToAlphabetic(date) {
		const months = [
			'January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December',
		];

		const parts = date.split('-');
		const year = parts[0];
		const month = months[Number(parts[1]) - 1];

		return `${month}  ${year}`;
	}
	return {
		OFF: {
			Ocean: [
				{
					key  : 'fclImports',
					name : 'Fcl Imports',
					keys : {
						bookedRevenue  : 'fclImportBookedRevenue' || 0,
						bookedExpense  : 'fclImportBookedExpense' || 0,
						accruedRevenue : 'fclImportAccruedRevenue' || 0,
						accruedExpense : 'fclImportAccruedExpense' || 0,

					},
					type: 'ocean',
				},
				{
					key  : 'fclExports',
					name : 'Fcl Exports',
					keys : {
						bookedRevenue  : 'fclExportBookedRevenue' || 0,
						bookedExpense  : 'fclExportBookedExpense' || 0,
						accruedRevenue : 'fclExportAccruedRevenue' || 0,
						accruedExpense : 'fclExportAccruedExpense' || 0,
					},
					type: 'ocean',
				},
				{
					key  : 'lclImports',
					name : 'Lcl Imports',
					keys : {
						bookedRevenue  : 'lclImportBookedRevenue' || 0,
						bookedExpense  : 'lclImportBookedExpense' || 0,
						accruedRevenue : 'lclImportAccruedRevenue' || 0,
						accruedExpense : 'lclImportAccruedExpense' || 0,
					},
					type: 'ocean',
				},
				{
					key  : 'lclExports',
					name : 'Lcl Exports',
					keys : {
						bookedRevenue  : 'lclExportBookedRevenue' || 0,
						bookedExpense  : 'lclExportBookedExpense' || 0,
						accruedRevenue : 'lclExportAccruedRevenue' || 0,
						accruedExpense : 'lclExportAccruedExpense' || 0,
					},
					type: 'ocean',
				},
				{
					key  : 'oceanCustoms',
					name : 'Ocean Customs',
					keys : {
						bookedRevenue  : 'oceanCustomsBookedRevenue' || 0,
						bookedExpense  : 'oceanCustomsBookedExpense' || 0,
						accruedRevenue : 'oceanCustomsAccruedRevenue' || 0,
						accruedExpense : 'oceanCustomsAccruedExpense' || 0,

					},
					type: 'ocean',
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'ocean',
				},
			],
			Air: [
				{
					key  : 'airImports',
					name : 'Air Import',
					keys : {
						bookedRevenue  : 'airImportBookedRevenue',
						bookedExpense  : 'airImportBookedExpense',
						accruedRevenue : 'airImportAccruedRevenue',
						accruedExpense : 'airImportAccruedExpense',

					},
					type: 'air',
				},
				{
					key  : 'airExports',
					name : 'Air Export',
					keys : {
						bookedRevenue  : 'airExportBookedRevenue',
						bookedExpense  : 'airExportBookedExpense',
						accruedRevenue : 'airExportAccruedRevenue',
						accruedExpense : 'airExportAccruedExpense',

					},
					type: 'air',
				},
				{
					key  : 'airCustoms',
					name : 'Air Customs ',
					keys : {
						bookedRevenue  : 'airCustomsBookedRevenue' || 0,
						bookedExpense  : 'airCustomsBookedExpense' || 0,
						accruedRevenue : 'airCustomsAccruedRevenue' || 0,
						accruedExpense : 'airCustomsAccruedExpense' || 0,
					},
					type: 'air',
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'air',
				},
			],
			Surface: [
				{
					key  : 'ftl',
					name : 'Ftl ',
					keys : {
						bookedRevenue  : 'ftlBookedRevenue',
						bookedExpense  : 'ftlBookedExpense',
						accruedRevenue : 'ltlAccruedRevenue',
						accruedExpense : 'ftlAccruedExpense',

					},
					type: 'surface',
				},
				{
					key  : 'ltl',
					name : 'Ltl ',
					keys : {
						bookedRevenue  : 'ltlBookedRevenue',
						bookedExpense  : 'ltlBookedExpense',
						accruedRevenue : 'ltlAccruedRevenue',
						accruedExpense : 'ltlAccruedExpense',

					},
					type: 'surface',
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'surface',
				},
			],
			segment: [
				{
					key  : 'ocean',
					name : 'Ocean',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'ocean',
				},
				{
					key  : 'air',
					name : 'Air',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'air',
				},
				{
					key  : 'surface',
					name : 'Surface',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'surface',
				},
				{
					key  : 'rail',
					name : 'Rail',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'rail',
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'total',
				},
			],
			nothing: [
				{
					key  : 'ocean',
					name : 'Ocean',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'ocean',
				},
				{
					key  : 'air',
					name : 'Air',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'air',
				},
				{
					key  : 'surface',
					name : 'Surface',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'surface',
				},
				{
					key  : 'rail',
					name : 'Rail',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'rail',
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'totalBookedRevenue',
						accruedRevenue : 'totalAccruedRevenue',
						bookedExpense  : 'totalBookedExpense',
						accruedExpense : 'totalAccruedExpense',
					},
					type: 'total',
				},
			],
			Rail: [
				{
					key  : 'railDomestic',
					name : 'Rail Domestic',
					type : 'railDomestic',
					keys : {
						bookedRevenue  : 'bookedRevenue',
						accruedRevenue : 'accruedRevenue',
						bookedExpense  : 'bookedExpense',
						accruedExpense : 'accruedExpense',
					},
				},
				{
					key  : 'total',
					name : 'Total',
					keys : {
						bookedRevenue  : 'bookedRevenue',
						accruedRevenue : 'accruedRevenue',
						bookedExpense  : 'bookedExpense',
						accruedExpense : 'accruedExpense',
					},
					type: 'total',
				},

			],
		},
		ON: [
			{
				key  : 'total',
				name : convertDateToAlphabetic(monthTo),
				keys : {
					bookedRevenue  : 'totalBookedRevenue',
					accruedRevenue : 'totalAccruedRevenue',
					bookedExpense  : 'totalBookedExpense',
					accruedExpense : 'totalAccruedExpense',
				},
				type: 'total',
			},
			{
				key  : 'total',
				name : convertDateToAlphabetic(monthFrom),
				keys : {
					bookedRevenue  : 'totalBookedRevenue',
					accruedRevenue : 'totalAccruedRevenue',
					bookedExpense  : 'totalBookedExpense',
					accruedExpense : 'totalAccruedExpense',
				},
				type: 'total',
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
