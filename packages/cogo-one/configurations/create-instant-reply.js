import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name        : 'title',
		type        : 'input',
		label       : 'Name',
		placeholder : 'Enter name ',
		rules       : {
			required : true,
			validate : (val) => (val?.trim()?.length <= GLOBAL_CONSTANTS.zeroth_index ? 'This cannot be Empty' : true),
		},
	},
	{
		name        : 'language',
		type        : 'select',
		label       : 'Language',
		placeholder : 'select language',
		options     : GLOBAL_CONSTANTS.languages.filter((eachLanguage) => !!eachLanguage?.code),
		rules       : {
			required: true,
		},
	},
	{
		name        : 'content',
		type        : 'textarea',
		label       : 'Content',
		rows        : 6,
		placeholder : 'Enter content',
		rules       : {
			required : true,
			validate : (val) => (val?.trim()?.length <= GLOBAL_CONSTANTS.zeroth_index ? 'This cannot be Empty' : true),
		},
	},
];
export default controls;
