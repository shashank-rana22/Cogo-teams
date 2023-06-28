import formValuePatterns from '@cogoport/ocean-modules/utils/formValuePatterns';

export const billingAddressControl = [
	{
		label       : 'GST',
		name        : 'gstin',
		type        : 'text',
		placeholder : 'Enter GST Number',
		showLabel   : false,
		span        : 3,
		rules       : {
			pattern: {
				value   : formValuePatterns.GST_NUMBER,
				message : 'GST Number is invalid',
			},
			required: 'GST Number is required',
		},
	},
	{
		label       : 'Billing Name',
		name        : 'partyName',
		placeholder : 'Enter Billing Name',
		type        : 'text',
		span        : 3,
		height      : 25,
		rules       : { required: { message: 'Billing Name is required' } },
	},
	{
		label       : 'Address',
		name        : 'billingAddress',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : { required: { message: 'Address is required' } },
		span        : 3,
		height      : 25,
		className   : 'primary md',
		style       : {
			resize: 'vertical',
		},
	},
	{
		label       : 'Pincode',
		name        : 'billingPincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		span        : 3,
	},
	{
		label    : 'City',
		name     : 'billingCity',
		type     : 'text',
		span     : 3,
		disabled : true,
	},
	{
		label    : 'State',
		name     : 'billingState',
		type     : 'text',
		span     : 3,
		disabled : true,
	},
	{
		label       : 'PAN Number',
		name        : 'panNumber',
		type        : 'text',
		placeholder : 'Enter PAN Number',
		showLabel   : false,
		span        : 3,
		rules       : {
			pattern: {
				value   : formValuePatterns.PAN_NUMBER,
				message : 'Enter a valid PAN',
			},
			required: 'PAN Number is required',
		},
	},
];
