const controls = ({ showComponent }) => {
	const formControls = [
		{
			type  : 'input',
			name  : 'name',
			label : 'Billing Party Name',
			rules : {
				required: { value: true, message: 'Name is required' },
			},
			show: true,
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
			show: showComponent !== 'create_trade_party',
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
			show: showComponent !== 'create_trade_party',
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
			show: true,
		},
		{
			type  : 'text-area',
			name  : 'address',
			label : 'Address',
			rows  : 4,
			rules : {
				required: { value: true },
			},
			show: true,
		},
		{
			type  : 'file',
			name  : 'tax_number_document_url',
			label : 'GST Proof',
			rules : {
				required: { value: true, message: 'Document is required' },
			},
			show: true,
		},
		{
			type  : 'checkbox',
			name  : 'is_sez',
			label : 'Is Sez',
			show  : true,
		},
	];

	return formControls;
};

export default controls;
