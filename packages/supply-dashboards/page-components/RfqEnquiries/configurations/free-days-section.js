import currencies from '../helpers/currencies';

const fclDetetionFreeDays = ({ heading = '', unit = 'per_container' }) => {
	const controls = 		[{
		name        : 'free_days',
		type        : 'number',
		span        : 4,
		heading,
		label       : 'Free Days Limit',
		placeholder : 'type here...',
		min         : 0,
		rules       : { required: 'This is required' },
	},
	{
		name : 'unit',
		span : 4,
		type : 'select',

		placeholder : 'Unit',
		disabled    : true,
		options     : [
			{ label: 'Per Container', value: 'per_container' },
			{ label: 'Per Kg per Day', value: 'per_kg_per_day' },
			{ label: 'Per Kg per Hour', value: 'per_kg_per_hour' },
		],
		values : unit || 'per_container',
		rules  : { required: 'This is required' },
	},
	{
		name        : 'slabs',
		type        : 'fieldArray',
		label       : unit === 'per_kg_per_hour' ? 'Hours Slab beyond Free day' : 'Days Slab beyond Free day',
		showButtons : true,
		buttonText  : 'Add More Slab',

		noDeleteButtonTill : 0,
		controls           : [
			{
				label       : 'Lower Limit',
				name        : 'lower_limit',
				type        : 'number',
				// disabled     : true,
				span        : 4,
				placeholder : 'Lower Limit (in MT)',
				rules       : { required: 'This is required' },
			},
			{
				label       : 'Upper Limit',
				name        : 'upper_limit',
				type        : 'number',
				span        : 4,
				placeholder : 'Upper Limit (in MT)',
				rules       : { required: 'This is required' },
			},
			{
				label       : 'Currency',
				name        : 'currency',
				type        : 'select',
				options     : currencies,
				span        : 1.5,
				placeholder : 'Curr...',
				rules       : { required: 'This is required' },
			},
			{
				label : 'Price',
				name  : 'price',
				type  : 'number',
				span  : 1.5,

				placeholder : 'Price',
				rules       : { required: 'This is required' },
			},
		],
	}];

	return controls;
};
export default fclDetetionFreeDays;
