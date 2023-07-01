import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formValuePatterns from '@cogoport/ocean-modules/utils/formValuePatterns';

export const personalDetailsControl = [
	{
		label   : 'Transit Mode',
		name    : 'transitMode',
		span    : 6,
		type    : 'radio',
		options : [
			{ label: 'Sea', value: 'SEA', disabled: true },
			{ label: 'Road', value: 'ROAD', disabled: true },
			{ label: 'Air', value: 'AIR', disabled: true },
		],

	},
	{
		label    : 'Policy Type',
		name     : 'policyType',
		span     : 6,
		type     : 'radio',
		disabled : true,
		options  : [
			{ label: 'Export', value: 'EXPORT', disabled: true },
			{ label: 'Import', value: 'IMPORT', disabled: true },
			{ label: 'Inland', value: 'INLAND', disabled: true },
		],
	},
	{
		label       : 'First Name',
		name        : 'insuredFirstName',
		span        : 3,
		type        : 'text',
		placeholder : 'Enter First Name',
		rules       : {
			required: ' First Name is required',
		},
	},
	{
		label       : 'Last Name',
		name        : 'insuredLastName',
		span        : 3,
		type        : 'text',
		placeholder : 'Enter Last Name',
		rules       : {
			required: 'Last Name is required',
		},
	},
	{
		label       : 'Email',
		name        : 'email',
		type        : 'email',
		span        : 3,
		placeholder : 'Enter Email',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : formValuePatterns.EMAIL,
				message : 'Email is invalid',
			},
		},
	},
	{
		label       : 'Mobile Number',
		name        : 'phoneNo',
		type        : 'number',
		span        : 3,
		placeholder : 'Enter your mobile number',
		rules       : {
			required : 'Mobile Number is required',
			validate: (v) => {
				if (!v?.number || !v?.country_code) {
					return 'Mobile Number is required';
				}
				return GLOBAL_CONSTANTS.regex_patterns.mobile_number.test(v.number) || 'Invalid Mobile Number';
			},
		},
	},
];
