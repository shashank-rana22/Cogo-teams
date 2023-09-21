const getFilterControls = [
	{
		name    : 'identity_type',
		label   : 'Identity Type',
		type    : 'select',
		span    : 12,
		options : [
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
	},
	{
		name  : 'identity_number',
		label : 'Identity Number',
		type  : 'text',
		span  : 12,
	},
	{
		name           : 'country_code',
		placeholder    : 'Country',
		label          : 'Country',
		type           : 'country_select',
		optionValueKey : 'country_code',
		caret          : true,
		multiple       : false,
		span           : 12,
	},
	{
		name     : 'registration_number_present',
		label    : 'Is Registration Number Present?',
		type     : 'select',
		span     : 12,
		multiple : false,
		options  : [
			{ label: 'Yes', value: 'true' },
			{ label: 'No', value: 'false' },
		],
	},
];
export default getFilterControls;
