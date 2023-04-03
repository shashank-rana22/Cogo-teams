const controls = () => {
	const formControls = [
		{
			type  : 'input',
			name  : 'name',
			label : 'Billing Party Name',
			rules : {
				required: { value: true, message: 'Name is required' },
			},
		},
		{
			type    : 'select',
			name    : 'address_type',
			label   : 'Address Type',
			options : [
				{ label: 'Office', value: 'office' },
				{ label: 'Factory', value: 'factory' },
				{ label: 'Warehouse Address', value: 'warehouse_address' },
			],
			rules: {
				required: { value: true, message: 'Address Type is required' },
			},
		},
		{
			type        : 'async-select',
			name        : 'country_id',
			label       : 'Country of Registration',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Country',
			params      : {
				filters: { type: ['country'] },
			},
			rules: {
				required: { value: true, message: 'Country of Registration is required' },
			},
		},
		{
			type        : 'async-select',
			name        : 'pincode',
			label       : 'Pincode',
			valueKey    : 'postal_code',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Pincode',
			params      : {
				filters: { type: ['pincode'] },
			},
			rules: {
				required: { value: true, message: 'Pincode is required' },
			},
		},
		{
			type  : 'text-area',
			name  : 'address',
			label : 'Address',
			rows  : 4,
			rules : {
				required: { value: true },
			},
		},
		{
			type  : 'file',
			name  : 'tax_number_document_url',
			label : 'GST Proof',
			rules : {
				required: { value: true, message: 'Document is required' },
			},
		},
		{
			type  : 'checkbox',
			name  : 'is_sez',
			label : 'Is Sez',
		},
	];

	return formControls;
};

export default controls;
