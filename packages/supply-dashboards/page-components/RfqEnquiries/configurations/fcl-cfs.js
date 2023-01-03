const fclCfsControls = ({ heading }) => {
	const controls = [
		{
			name       : 'service_provider_id',
			label      : 'Service Provider',
			span       : 4,
			type       : 'select',
			placeolder : 'select service provider',

		},
		{
			label       : 'Rate Provided by user',
			name        : 'sourced_by_id',
			placeholder : 'Select',
			type        : 'select',
			isClearable : true,
			span        : 4,
		},
		{
			type               : 'fieldArray',
			showButtons        : true,
			name               : 'line_items',
			heading,
			buttonText         : 'Add Line Items',
			noDeleteButtonTill : 1,
			controls           : [
				{
					name        : 'code',
					type        : 'select',
					span        : 4,
					valueKey    : 'code',
					placeholder : 'Charge Name',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'unit',
					span        : 4,
					type        : 'select',
					className   : 'primary lg',
					placeholder : 'Unit',
					rules       : { required: 'This is required' },
				},
				{
					name           : 'currency',
					span           : 1.5,
					type           : 'select',
					placeholder    : 'Curr...',
					className      : 'primary lg',
					optionsListKey : 'currencies',
					showOptional   : false,
					rules          : { required: 'This is required' },
				},
				{
					name         : 'price',
					span         : 1.5,
					type         : 'number',
					showOptional : false,
					className    : 'primary lg',
					placeholder  : 'Amount',
					rules        : { required: 'This is required' },
				},
			],
		},
	];
	return controls;
};

export default fclCfsControls;
