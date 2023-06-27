import workScopes from '../../../../constants/work-scope';

const getControls = ({ geo }) => [
	{
		label       : 'Name',
		name        : 'name',
		placeholder : 'Enter name',
		type        : 'text',
		rules       : { required: 'Name is required' },
	},
	{
		label       : 'Email id',
		name        : 'email',
		placeholder : 'Enter email',
		type        : 'text',
		rules       : {
			required : 'Email is required',
			pattern  : { value: geo.regex.EMAIL, message: 'Please write valid email' },
		},
	},
	{
		label       : 'Mobile Number',
		name        : 'mobile_number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile-number-select',
		numberKey   : 'mobile_number',
		codeKey     : 'mobile_country_code',
		select2     : 'new',
		rules       : {
			required : true,
			validate : (value) => (value?.mobile_country_code && value?.mobile_number
				? undefined
				: 'Mobile Number is Required'),
		},
	},
	{
		label       : 'Whatsapp Number',
		name        : 'whatsapp_number',
		placeholder : 'Enter Whatsapp Number',
		type        : 'mobile-number-select',
		numberKey   : 'whatsapp_number',
		codeKey     : 'whatsapp_country_code',
		select2     : 'new',
	},
	{
		name        : 'work_scopes',
		label       : 'Work Scopes',
		placeholder : 'Select work scopes',
		options     : workScopes,
		type        : 'multi-select',
	},
];

export default getControls;
