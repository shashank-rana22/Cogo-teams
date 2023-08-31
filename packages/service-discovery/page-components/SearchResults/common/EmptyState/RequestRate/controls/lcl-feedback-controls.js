import CURRENCY_CODE_OPTIONS from './currency-options';

const getLclFeedbackControls = () => {
	const lclFeedbackControls = [
		{
			name    : 'preferred_freight_rate_currency',
			label   : 'Currency',
			type    : 'select',
			options : CURRENCY_CODE_OPTIONS,
			span    : 4,
		},
		{
			name  : 'preferred_freight_rate',
			label : 'Indicative Rate',
			type  : 'number',
			span  : 4,
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			span  : 4,
			rules : { required: true },
		},
		{
			name  : 'remarks',
			type  : 'text',
			label : 'Remarks',
			span  : 12,
			rules : { required: true },
			placeholder:
				'Please add commodity details and other specific requirements here...',
		},
	];

	return lclFeedbackControls;
};

export default getLclFeedbackControls;
