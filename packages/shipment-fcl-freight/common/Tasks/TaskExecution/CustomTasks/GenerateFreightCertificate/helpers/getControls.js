const getControls = () => {
	const controls = [
		{
			name             : 'freight_declaration',
			type             : 'fieldArray',
			label            : 'Freight Declaration',
			showButtons      : false,
			showDeleteButton : false,
			value            : [],
			controls         : [
				{
					name     : 'commodity',
					label    : 'Commodity',
					type     : 'text',
					disabled : true,
					span     : 4,
					rules    : { required: 'Required' },
				},
				{
					name           : 'currency',
					label          : 'Currency',
					type           : 'select',
					showOptional   : false,
					optionsListKey : 'currencies',
					placeholder    : 'Select Currency',
					rules          : { required: { value: true, message: 'Currency required' } },
					span           : 2,
				},
				{
					name         : 'freight_price',
					label        : 'Freight Rate',
					type         : 'number',
					showOptional : false,
					placeholder  : 'Enter rate',
					rules        : {
						required : { value: true, message: 'Freight rate required' },
						validate : (value) => (value < 0 ? 'Freight rate cannot be negative' : true),
					},
					span: 2.5,
				},
				{
					name         : 'origin_price',
					label        : 'Exwork',
					type         : 'number',
					showOptional : false,
					placeholder  : 'Enter rate',
					rules        : {
						required : { value: true, message: 'Exwork required' },
						validate : (value) => (value < 0 ? 'Exwork cannot be negative' : true),
					},
					span: 1.5,
				},
				{
					name     : 'total_charge',
					label    : 'Total',
					disabled : true,
					span     : 2,
					rules    : { required: 'Required' },
				},
			],
		},
	];

	return controls;
};

export default getControls;
