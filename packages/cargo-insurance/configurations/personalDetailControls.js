import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getPersonalDetailControls = ({ t }) => [
	{
		name        : 'firstName',
		label       : t('cargoInsurance:poc_control_first_name'),
		placeholder : t('cargoInsurance:poc_control_first_name_placeholder'),
		size        : 'sm',
		type        : 'text',
		rules       : { required: true },
	},
	{
		name        : 'lastName',
		label       : t('cargoInsurance:poc_control_last_name'),
		placeholder : t('cargoInsurance:poc_control_last_name_placeholder'),
		type        : 'text',
		size        : 'sm',
		rules       : { required: true },
	},
	{
		name        : 'email',
		label       : t('cargoInsurance:poc_control_email'),
		placeholder : t('cargoInsurance:poc_control_email_placeholder'),
		type        : 'text',
		size        : 'sm',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : t('cargoInsurance:poc_control_email_err'),
			},
		},
	},
	{
		name        : 'phoneNo',
		label       : t('cargoInsurance:poc_control_phone'),
		type        : 'mobileSelect',
		placeholder : t('cargoInsurance:poc_control_phone_placeholder'),
		size        : 'sm',
		rules       : { required: true },
	},
];

export default getPersonalDetailControls;
