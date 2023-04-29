import currencies from '../helpers/currencies';

const fclDetetionFreeDays = ({ heading = '', unit = 'per_container', type = '', data }) => {
	let name1 = 'free_limit';
	let name2 = 'unit';
	let name3 = 'slabs';
	if (type === 'origin_air') {
		name1 = 'origin_free_limit';
		name2 = 'origin_unit';
		name3 = 'origin_slabs';
	} else if (type === 'destination_air') {
		name1 = 'destination_free_limit';
		name2 = 'destination_unit';
		name3 = 'destination_slabs';
	}
	const controls = 		[{
		name        : name1,
		type        : 'number',
		span        : 4,
		heading,
		label       : 'Free Days Limit',
		placeholder : 'type here...',
		min         : 0,
		value       : data?.data?.free_days_detention_destination
		|| data?.data?.destination_storage_Free_days,
		rules: { required: 'This is required' },
	},
	{
		name        : name2,
		span        : 4,
		type        : 'select',
		label       : 'Unit',
		placeholder : 'Unit',
		disabled    : true,
		options     : [
			{ label: 'Per Container', value: 'per_container' },
			{ label: 'Per Kg per Day', value: 'per_kg_per_day' },
			{ label: 'Per Kg per Hour', value: 'per_kg_per_hour' },
		],
		value : unit || 'per_container',
		rules : { required: 'This is required' },
	},
	{
		name        : name3,
		type        : 'fieldArray',
		heading     : unit === 'per_kg_per_hour' ? 'Hours Slab beyond Free day' : 'Days Slab beyond Free day',
		showButtons : true,
		buttonText  : 'Add More Slab',

		noDeleteButtonTill : 0,
		controls           : [
			{
				label       : 'Lower Limit',
				name        : 'lower_limit',
				type        : 'number',
				disabled    : true,
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
				rules       : { required: 'This is required', min: 0 },
			},
		],
	}];

	return controls;
};
export default fclDetetionFreeDays;
