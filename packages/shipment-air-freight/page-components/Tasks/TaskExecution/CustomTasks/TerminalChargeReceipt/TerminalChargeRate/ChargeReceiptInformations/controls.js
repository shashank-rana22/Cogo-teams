const controls = (index = 0) => [
	{
		name        : `csr_reference_number_${index}`,
		label       : 'TC Invoice Number',
		type        : 'text',
		placeholder : 'Type TC Invoice No',
		span        : 6,
		rules       : { required: 'TC Invoice No. is required' },
	},
	{
		name        : `price_${index}`,
		label       : 'Price',
		type        : 'number',
		placeholder : 'Enter Sell Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : `tax_price_${index}`,
		label       : 'Tax Price',
		type        : 'number',
		placeholder : 'Enter Tax Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : `total_tax_price_${index}`,
		label       : 'Total Tax Price',
		type        : 'number',
		placeholder : 'Enter Total Tax Price',
		rules       : { required: 'Price is required', min: 0 },
		span        : 6,
	},
	{
		name        : `alias_${index}`,
		label       : 'Alias (Optional)',
		type        : 'text',
		placeholder : 'Enter Alias (Only if required)',
		span        : 6,
	},
];

export default controls;
