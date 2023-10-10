const getAddressControls = ({ includeTax = false }) => [
	{
		name        : 'name',
		label       : 'Billing Party Name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : { required: 'required *' },
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'country',
		label       : 'Country',
		type        : 'asyncSelect',
		placeholder : 'Select Country',
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'pincode',
		label       : 'Pincode',
		type        : 'asyncSelect',
		placeholder : 'Select Placeholder',
		params      : { filters: { type: ['pincode'] } },
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'text',
		placeholder : 'Enter State',
		disabled    : true,
	},
	{
		name        : 'city',
		label       : 'City',
		type        : 'text',
		placeholder : 'Enter City',
		disabled    : true,
	},
	{
		name  : 'includeTax',
		label : 'Include Tax Number',
		type  : 'checkbox',
	},
	{
		name    : 'address_type',
		label   : 'Save Address as',
		type    : 'chips',
		options : [
			{ children: 'Factory', key: 'factory' },
			{ children: 'Office', key: 'office' },
			{ children: 'Ware House', key: 'warehouse' },
		],
		multiple : false,
		showEle  : !includeTax,
	},
	{
		name        : 'tax_number',
		label       : 'Tax Number',
		type        : 'text',
		placeholder : 'Enter Tax Number',
	},
];

export default getAddressControls;
