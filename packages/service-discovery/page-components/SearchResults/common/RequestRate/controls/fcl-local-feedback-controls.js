import CURRENCY_CODE_OPTIONS from './currency-options';

const getFclLocalFeedbackControls = () => {
	const fclLocalFeedbackControls = [
		{
			name    : 'preferred_freight_rate_currency',
			label   : 'Currency',
			type    : 'select',
			options : CURRENCY_CODE_OPTIONS,
			span    : 6,
		},
		{
			name  : 'preferred_freight_rate',
			label : 'Indicative Rate',
			type  : 'number',
			min   : 0,
			span  : 6,
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

	return fclLocalFeedbackControls;
};

export default getFclLocalFeedbackControls;
