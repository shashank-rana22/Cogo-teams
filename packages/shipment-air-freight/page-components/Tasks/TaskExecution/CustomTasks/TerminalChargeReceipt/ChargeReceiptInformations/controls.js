const controls = () => [
	{
		name        : 'price',
		label       : 'Price',
		type        : 'number',
		placeholder : 'Enter Sell Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : 'tax_price',
		label       : 'Tax Price',
		type        : 'number',
		placeholder : 'Enter Tax Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : 'total_tax_price',
		label       : 'Total Tax Price',
		type        : 'number',
		placeholder : 'Enter Total Tax Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : 'alias',
		label       : 'Alias (Optional)',
		type        : 'text',
		placeholder : 'Enter Alias (Only if required)',
		span        : 6,
	},
];

export default controls;
