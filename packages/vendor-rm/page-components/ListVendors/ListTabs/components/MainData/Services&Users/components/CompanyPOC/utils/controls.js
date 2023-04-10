import workScopes from '../../../../../../../../../utils/work-scopes.json';

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter your name..',
		style       : { flexBasis: '40%' },
		rules       : { required: 'Country is required' },
	},
	{
		name        : 'email',
		label       : 'Email Id',
		style       : { flexBasis: '40%' },
		placeholder : 'Enter Email Id',
		rules       : { required: 'Email is required' },
	},
	{
		name        : 'mobile_number',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '40%' },
		placeholder : 'Type here',
		rules       : { required: 'Mobile Number is required' },
	},
	{
		name        : 'poc_role',
		label       : 'Role in Company',
		style       : { flexBasis: '40%' },
		type        : 'multiSelect',
		options     : workScopes,
		placeholder : 'Enter Poc Role',
		rules       : { required: 'Role is required' },
	},
];

export default controls;
