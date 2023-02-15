export const getControls = ({ countryOptions = {}, cityOptions = {} }) => [
	{
		...countryOptions,
		name        : 'country_id',
		label       : 'Country of Registration',
		type        : 'select',
		placeholder : 'Select a Country',
		style       : { flexBasis: '30%', width: '360px' },
		condition   : {
			type: [
				'city',
				'seaport',
				'airport',
				'pincode',
				'cfs',
				'cluster',
				'region',
				'yard',
				'railway_terminal',
				'warehouse',
			],
		},
		rules: { required: 'Country is required' },
	},
	{
		name        : 'registration_number_type',
		label       : 'Tax Number',
		type        : 'select',
		placeholder : 'Select',
		style       : { flexBasis: '8%', marginRight: '2px' },
		condition   : { type: ['country'] },
		rules       : { required: 'Tax Number Type is Required' },
		// options     : countrywiseOptions,
	},
	{
		name        : 'registration_number',
		type        : 'text',
		style       : { flexBasis: '22%', marginTop: '10px' },
		condition   : { type: ['country'] },
		placeholder : 'Enter Document No',
		rules       : { required: 'Document No is required' },
	},
	{
		name        : 'business_name',
		label       : 'Name of the Organization',
		type        : 'text',
		style       : { flexBasis: '33%', marginRight: '0px' },
		placeholder : 'Type here',
		rules       : { required: 'Name of the Organization is required' },
	},
	{
		name            : 'registration_proof_url',
		showLabel       : false,
		label           : 'Upload Tax Document Proof (Pan/GST Certificate)',
		style           : { flexBasis: '100%', marginRight: '0px' },
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		accept          : 'image/*',
		uploadType      : 'aws',
		rules           : { required: 'Tax Document is required' },
	},
	{
		name        : 'company_type',
		label       : 'Type of Company',
		type        : 'select',
		placeholder : 'Select an Organization Type',
		style       : { flexBasis: '30%' },
		rules       : { required: 'Company Type is required' },
		options     : [
			{
				label : 'Private Limited',
				value : 'private_limited',
			},
			{
				label : 'Public Limited',
				value : 'public_limited',
			},
			{
				label : 'Limited Liability Partnership',
				value : 'limited_liability_partnership',
			},
			{
				label : 'Partnership',
				value : 'partnership',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
	},
	{
		...cityOptions,
		name        : 'city_id',
		label       : 'Branch',
		type        : 'select',
		style       : { flexBasis: '30%' },
		placeholder : 'Select a city',
		condition   : {
			type: [
				'seaport',
				'airport',
				'pincode',
				'cfs',
				'cluster',
				'yard',
				'warehouse',
				'railway_terminal',
			],
		},
		rules: { required: 'City is Required' },
	},
];
