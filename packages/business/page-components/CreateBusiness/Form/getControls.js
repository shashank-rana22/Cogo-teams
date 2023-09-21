const fieldArrayField = [
	{
		name        : 'address',
		label       : 'Address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'Address is required',
		},
	},
	{
		name        : 'district',
		label       : 'District',
		type        : 'text',
		placeholder : 'Enter District',
	},
	{
		name        : 'city',
		label       : 'City',
		type        : 'text',
		placeholder : 'Enter City',
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'text',
		placeholder : 'Enter State',
	},
	{
		name        : 'pincode',
		label       : 'Pincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
	},
];

const getControls = [
	{
		name        : 'business_type',
		label       : 'Business Type',
		type        : 'text',
		placeholder : 'Enter Business Type',
	},
	{
		name        : 'business_name',
		label       : 'Business Name',
		type        : 'text',
		placeholder : 'Enter Business Name',
		rules       : {
			required: 'Business name is required',
		},
	},
	{
		name       : 'identity_type',
		label      : 'Identity Type',
		type       : 'select',
		selectType : 'pills',
		options    : [
			{
				label : 'IEC',
				value : 'iec',
			},
			{
				label : 'Tax',
				value : 'tax',
			},
			{
				label : 'Registration',
				value : 'registration',
			},
		],
		placeholder : 'Select',
		rules       : {
			required: 'Identity type is required',
		},

	},
	{
		name        : 'identity_number',
		label       : 'Identity Number',
		type        : 'text',
		placeholder : 'Enter Identity Number',
		rules       : {
			required: 'Identity number is required',
		},
	},
	{
		name        : 'trade_name',
		label       : 'Trade Name',
		type        : 'text',
		placeholder : 'Enter Trade Name',
	},
	{
		name        : 'establishment_year',
		label       : 'Establishment Year',
		type        : 'text',
		placeholder : 'Enter Establishment Year',
	},
	{
		name           : 'country_code',
		placeholder    : 'Country',
		label          : 'Country',
		type           : 'country_select',
		optionValueKey : 'country_code',
		caret          : true,
		multiple       : false,
		rules          : {
			required: 'Country is required',
		},
	},
	{
		name    : 'status',
		label   : 'Status',
		type    : 'select',
		options : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
		],
		placeholder : 'Select',
		rules       : {
			required: 'Status type is required',
		},
	},
	{
		name            : 'addresses',
		type            : 'fieldArray',
		isChildRequired : true,
		showButtons     : true,
		buttonText      : 'Add',
		label           : 'Addresses',
		controls        : fieldArrayField,
	},
];

export default getControls;
