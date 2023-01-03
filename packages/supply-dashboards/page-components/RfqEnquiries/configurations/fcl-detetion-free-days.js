const fclDetetionFreeDays = ({ heading }) => {
	const controls = 		[{
		name         : 'detention_free_days',
		type         : 'number',
		span         : 4,
		heading,
		label        : 'Detention Free Days',
		placeholder  : 'type here...',
		showOptional : false,
		className    : 'primary lg',
		min          : 0,
	},
	{
		name               : 'detention_days',
		type               : 'fieldArray',
		label              : 'Detention Days',
		showButtons        : false,
		buttonText         : 'Add Detention Days Slab',
		className          : 'primary lg',
		noDeleteButtonTill : 0,
		controls           : [
			{
				label        : 'Lower Limit',
				name         : 'lower_limit',
				type         : 'number',
				disabled     : true,
				span         : 4,
				showOptional : false,
				placeholder  : 'Lower Limit (in MT)',
				className    : 'primary lg',
				rules        : { required: 'This is required' },
			},
			{
				label        : 'Upper Limit',
				name         : 'upper_limit',
				type         : 'number',
				span         : 4,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Upper Limit (in MT)',
				rules        : { required: 'This is required' },
			},
			{
				label          : 'Currency',
				name           : 'currency',
				type           : 'select',
				optionsListKey : 'currencies',
				span           : 1.5,
				showOptional   : false,
				className      : 'primary lg',
				placeholder    : 'Curr...',
				rules          : { required: 'This is required' },
			},
			{
				label        : 'Price',
				name         : 'price',
				type         : 'number',
				span         : 1.5,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Price',
				rules        : { required: 'This is required' },
			},
		],
	}];

	return controls;
};
export default fclDetetionFreeDays;
