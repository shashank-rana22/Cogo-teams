const controls = ({ showComponent, mobileCountryCodeOptions }) => {
	const formControls = [
		{
			name  : 'name',
			label : 'Billing Party Name',
			type  : 'text',
			size  : 'sm',
			rules : { required: 'Name is required' },
			show  : true,
		},
		{
			name    : 'address_type',
			label   : 'Address Type',
			size    : 'sm',
			type    : 'select',
			options : [
				{ label: 'Office', value: 'office' },
				{ label: 'Factory', value: 'factory' },
				{ label: 'Warehouse Address', value: 'warehouse_address' },
			],
			rules : { required: 'Address Type is required' },
			show  : showComponent !== 'create_trade_party',
		},
		{
			name        : 'country_id',
			label       : 'Country of Registration',
			type        : 'async-select',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Country',
			size        : 'sm',
			params      : {
				filters: { type: ['country'] },
			},
			rules : { required: 'Country of Registration is required' },
			show  : showComponent !== 'create_trade_party',
		},
		{
			name        : 'pincode',
			label       : 'Pincode',
			type        : 'async-select',
			valueKey    : 'postal_code',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Pincode',
			size        : 'sm',
			params      : {
				filters: { type: ['pincode'] },
			},
			rules : { required: 'Pincode is required' },
			show  : true,
		},
		{
			name  : 'address',
			label : 'Address',
			type  : 'text-area',
			rows  : 4,
			rules : { required: 'Address is required' },
			show  : true,
		},
		{
			name  : 'tax_number_document_url',
			label : 'GST Proof',
			type  : 'file',
			size  : 'sm',
			rules : { required: 'Document is required' },
			show  : true,
		},
		{
			name  : 'is_sez',
			label : 'Is Sez',
			type  : 'checkbox',
			show  : true,
		},
	];

	const pocControls = [
		{
			nameSuffix : 'name',
			label      : 'POC Name',
			size       : 'sm',
			type       : 'text',
			rules      : { required: 'Name is required' },
			show       : true,
		},
		{
			nameSuffix : 'email',
			label      : 'POC Email',
			size       : 'sm',
			type       : 'text',
			rules      : { required: 'Email is required' },
			show       : true,
		},
		{
			nameSuffix : 'mobile_country_code',
			label      : 'Country Code',
			size       : 'sm',
			type       : 'select',
			options    : mobileCountryCodeOptions,
			rules      : { required: 'Country Code is required' },
			show       : true,
		},
		{
			nameSuffix : 'mobile_number',
			label      : 'Mobile Number',
			size       : 'sm',
			type       : 'text',
			rules      : { required: 'Mobile Number is required' },
			show       : true,
		},
	];

	return { formControls, pocControls };
};

export default controls;
