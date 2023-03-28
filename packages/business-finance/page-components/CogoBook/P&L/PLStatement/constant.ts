export const optionsPeriod = [
	{ label: 'This Week', value: 'week' },
	{ label: 'This Month', value: 'month' },
	{ label: 'This Quarter', value: 'quarter' },
	{ label: 'Last Quarter', value: 'lastQuarter' },
	{ label: 'Custom', value: 'custom' },
];
export const optionsCheck = [
	{ name: 'all', value: 'all', label: 'All' },
	{ name: 'nonZero', value: 'nonZero', label: 'Non Zero' },
];

export const optionsPills = [
	{ key: 'Segment', children: 'Segment' },
	{ key: 'Service', children: 'Service' },
	{ key: 'DemandChannel', children: 'Demand Channel' },
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
