import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CREATE_CONFIG_TEMPLATE = [
	{
		name        : 'name',
		label       : 'Name',
		controlType : 'input',
		placeholder : 'Type name here...',
		width       : '300px',
		rules       : {
			required  : true,
			maxLength : 64,
			validate  : (value) => (value.trim() === '' ? 'Cannot be empty' : true),
			pattern   : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email_template_name_pattern,
				message : 'Name is not valid',
			},
		},
	},
	{
		name        : 'description',
		label       : 'Description',
		controlType : 'textArea',
		placeholder : 'Type description here...',
		width       : '300px',
		rows        : 3,
		rules       : {
			required : true,
			validate : (value) => (value.trim() === '' ? 'Cannot be empty' : true),
		},
	},
	{
		label       : 'Language',
		name        : 'language',
		controlType : 'select',
		options     : GLOBAL_CONSTANTS.languages.filter((eachLanguage) => !!eachLanguage?.code),
		width       : '300px',
		placeholder : 'Select language here...',
		rules       : {
			required: true,
		},
	},
];

export default CREATE_CONFIG_TEMPLATE;
