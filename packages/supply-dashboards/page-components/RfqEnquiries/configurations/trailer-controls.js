import chargeControl from './charge-controls';

const trailerControls = [
	{
		name    : 'haulage_type',
		type    : 'select',
		label   : 'Haulage Type',
		span    : 4,
		options : [{
			label : 'Carrier',
			value : 'carrier',
		}, {
			label : 'Merchant',
			value : 'merchant',
		}],
	},
	{
		name    : 'transportation_modes',
		type    : 'select',
		label   : 'Transportation Modes',
		span    : 4,
		options : [{
			label : 'Rail',
			value : 'rail',
		}, {
			label : 'Trailer',
			value : 'trailer',
		}, {
			label : 'Barge',
			value : 'barge',
		}],
	},
	chargeControl({ heading: '', charge_code_name: 'freights_charge_codes' }),
];

export default trailerControls;
