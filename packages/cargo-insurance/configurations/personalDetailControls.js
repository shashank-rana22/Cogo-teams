import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getPersonalDetailControls = () => [
	{
		name        : 'firstName',
		label       : 'First Name*',
		placeholder : 'Enter First Name',
		size        : 'sm',
		type        : 'text',
		rules       : { required: true },
	},
	{
		name        : 'lastName',
		label       : 'Last Name*',
		placeholder : 'Enter Last Name',
		type        : 'text',
		size        : 'sm',
		rules       : { required: true },
	},
	{
		name        : 'email',
		label       : 'Email Id*',
		placeholder : 'Enter Email Name',
		type        : 'text',
		size        : 'sm',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Enter valid email',
			},
		},
	},
	{
		name        : 'phoneNo',
		label       : 'Phone Number*',
		type        : 'mobileSelect',
		placeholder : 'Enter Mobile number',
		size        : 'sm',
		rules       : { required: true },
	},
];

export default getPersonalDetailControls;
