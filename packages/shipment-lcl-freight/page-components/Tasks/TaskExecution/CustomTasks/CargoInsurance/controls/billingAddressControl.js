import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const geo = getGeoConstants();

export const billingAddressControl = ({ setValue = () => {} }) => [
	{
		label       : 'GST',
		name        : 'gstin',
		type        : 'text',
		placeholder : 'Enter GST Number',
		showLabel   : false,
		span        : 3,
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.gst_number,
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
		rules       : { required: 'Billing Name is required' },
	},
	{
		label       : 'Address',
		name        : 'billingAddress',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : { required: 'Address is required' },
		span        : 3,
		height      : 25,
		style       : {
			resize: 'vertical',
		},
	},
	{
		label       : 'Pincode',
		name        : 'billingPincode',
		type        : 'async-select',
		placeholder : 'Enter Pincode',
		asyncKey    : 'list_locations',
		valueKey    : 'postal_code',
		labelKey    : 'postal_code',
		rules       : {
			required: 'Pincode is required',
		},
		onChange: (_, option) => {
			setValue('billingState', option?.region?.name);
			setValue('billingCity', option?.city?.name);
		},
		initialCall : false,
		params      : {
			filters: {
				type: ['pincode'],
			},
			includes: {
				country                 : true,
				region                  : true,
				city                    : true,
				default_params_required : true,
			},
		},
		show : true,
		span : 3,
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
				value   : geo.regex.PAN,
				message : 'Enter a valid PAN',
			},
			required: 'PAN Number is required',
		},
	},
];
