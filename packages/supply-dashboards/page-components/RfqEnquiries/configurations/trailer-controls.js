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
		rules: { required: 'This is required' },
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
		rules: { required: 'This is required' },
	},
	chargeControl({ heading: '', charge_code_name: 'freights_charge_codes', service: 'trailer' }),
];

export default trailerControls;
