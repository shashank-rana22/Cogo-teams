import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import workScopes from '../../../../../../utils/work-scopes.json';

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { flexBasis: '42%' },
		placeholder : 'Enter Name',
		rules       : { required: 'Contact Name is required' },

	},
	{
		name        : 'email',
		label       : 'Contact Email ID',
		type        : 'text',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here..',
		rules       : {
			required : 'Email of the Contact is required',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email is invalid',
			},
		},

	},
	{
		name        : 'mobile_number',
		label       : 'Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },

	},

	{
		name        : 'alternate_mobile_number',
		label       : 'Alternate Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: false },
	},
	{
		name        : 'whatsapp_number',
		label       : 'Whatsapp Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: false },
	},

	{
		name        : 'work_scopes',
		label       : 'Role in Company',
		type        : 'multiSelect',
		placeholder : 'Select a role type',
		style       : { flexBasis: '42%' },
		rules       : { required: 'Role in Company is required' },
		options     : workScopes,

	},

];

export default controls;
