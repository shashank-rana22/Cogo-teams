const firstControls = [
	{
		name        : 'credit_days',
		type        : 'number',
		placeholder : '0 days',
		rules       : { min: 0 },
		span        : 12,
		label       : 'Credit Days',
	},
	{
		label : 'Credit amount',
		span  : 4,
	}, {
		name : 'credit_amount_hold',
		type : 'radio',

		options: [{
			label : 'At Date of Sailing',
			value : 'sailing',
		},
		{
			label : 'At Date of Invoicing',
			value : 'invoicing',
		}],
		span: 12,
	}, {
		name        : 'credit_currency',
		type        : 'async_select',
		asyncKey    : 'list_exchange_rate_currencies',
		value       : 'INR',
		initialCall : true,
		span        : 3,
	},
	{
		name        : 'credit_amount',
		type        : 'number',
		placeholder : '0.0',
		span        : 9,
		rules       : { min: 0 },
	},

];
export default firstControls;
