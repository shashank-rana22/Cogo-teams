import workScopes from '../../../../commons/utils/work-scopes.json';

const controls = [
	{
		name        : 'name',
		label       : 'Name of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Name is required' },
	},
	{
		name        : 'email',
		label       : 'Email of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : {
			required : 'Email of the Contact is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },
	},
	{
		name        : 'whatsapp_number',
		label       : 'Whatsapp Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Whatsapp Number is required' },
	},
	{
		name        : 'poc_role',
		label       : 'Role in Company',
		type        : 'multiSelect',
		placeholder : 'Select a role type',
		style       : { flexBasis: '30%' },
		rules       : { required: 'Company Type is required' },
		options     : workScopes,
	},
	{
		name            : 'contact_proof_url',
		showLabel       : false,
		label           : 'Upload Vendor Document Proof (Pan/Aadhar Card)',
		style           : { flexBasis: '100%', marginRight: '0px' },
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		uploadType      : 'aws',
		rules           : { required: 'Tax Document is required' },
	},
];

export default controls;
