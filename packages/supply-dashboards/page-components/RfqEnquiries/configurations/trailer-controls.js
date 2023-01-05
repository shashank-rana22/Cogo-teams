const trailerControls = [
	{
		name    : 'haulage_type',
		type    : 'select',
		label   : 'Haulage Type',
		options : [{
			lable : 'Carrier',
			value : 'carrier',
		}, {
			label : 'Merchant',
			value : 'merchant',
		}],
		requirement: true,
	},
	{
		name    : 'transportation_modes',
		type    : 'select',
		label   : 'Transportation Modes',
		options : [{
			lable : 'Rail',
			value : 'rail',
		}, {
			label : 'Trailer',
			value : 'trailer',
		}, {
			label : 'Barge',
			value : 'barge',
		}],
		requirement: true,
	},
];

export default trailerControls;
