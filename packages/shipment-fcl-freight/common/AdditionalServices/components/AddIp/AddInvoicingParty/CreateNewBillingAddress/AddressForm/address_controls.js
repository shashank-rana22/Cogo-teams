const control = [
	{
		name      : 'gst_list',
		type      : 'select',
		span      : 6,
		className : 'primary md',
		showIn    : [
			'billingAddress',
		],
		rules: {
			required: true,
		},
	},
	{
		type  : 'text',
		name  : 'name',
		label : 'Billing Party Name',
		rules : {
			required: true,
		},
		span   : 6,
		showIn : [
			'billingAddress',
			'otherAddress',
		],
	},
	{
		type    : 'select',
		name    : 'address_type',
		label   : 'Address Type',
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: {
			required: true,
		},
		span   : 6,
		showIn : [
			'otherAddress',
		],
	},
	{
		type           : 'location-select',
		name           : 'country_id',
		label          : 'Country of Registration',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: [
					'country',
				],
			},
		},
		defaultOptions : true,
		rules          : {
			required: true,
		},
		span   : 6,
		showIn : [
			'otherAddress',
		],
	},
	{
		type      : 'text',
		name      : 'tax_number',
		label     : 'GST Number',
		className : 'uppercase',
		maxLength : 15,
		rules     : {
			required: true,
		},
		span   : 6,
		showIn : [
			'billingAddress',
		],
	},
	{
		type           : 'location-select',
		name           : 'pincode',
		label          : 'Pincode',
		optionsListKey : 'locations',
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		params         : {
			filters: {
				type: [
					'pincode',
				],
			},
		},
		caret : true,
		rules : {
			required: true,
		},
		span   : 6,
		showIn : [
			'billingAddress',
			'otherAddress',
		],
	},
	{
		type       : 'file',
		name       : 'tax_number_document_url',
		label      : 'TAX Proof',
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: true,
		},
		span   : 6,
		showIn : [
			'billingAddress',
		],
	},
	{
		name           : 'organization_branch_id',
		label          : 'Organization Branch',
		placeholder    : 'Select organization Branch',
		type           : 'select',
		value          : '',
		optionsListKey : 'organization-branches',
		caret          : true,
		isClearable    : true,
		defaultOptions : true,
		rules          : {
			required: 'Name is required',
		},
		className : 'primary sm',
		showIn    : [
			'billingAddress',
		],
	},
	{
		type  : 'textarea',
		name  : 'address',
		label : 'Address',
		rules : {
			required: true,
		},
		span   : 6,
		height : 45,
		showIn : [
			'billingAddress',
			'otherAddress',
		],
		style: {
			resize: 'vertical',
		},
	},
	{
		type    : 'checkbox',
		name    : 'is_sez',
		options : [
			{
				value : true,
				label : 'Is Sez',
			},
		],
		multiple : true,
		span     : 12,
		showIn   : [
			'billingAddress',
		],
	},
	{
		type       : 'file',
		name       : 'sez_proof',
		label      : 'SEZ Proof',
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: true,
		},
		span   : 6,
		showIn : [
			'billingAddress',
		],
	},
];

export default control;
