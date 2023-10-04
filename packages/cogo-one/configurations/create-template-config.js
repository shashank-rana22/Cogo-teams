import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SUBJECT_MAPPING } from '../constants/mailConstants';

const getTemplatesOptions = () => Object.values(SUBJECT_MAPPING).reduce(
	(acc, itm) => {
		if (itm?.template_tags?.[GLOBAL_CONSTANTS.zeroth_index]) {
			return [...acc, {
				children : itm.value,
				key      : itm?.template_tags?.[GLOBAL_CONSTANTS.zeroth_index],
			}];
		}
		return acc;
	},
	[],
);

const CREATE_CONFIG_TEMPLATE = [
	{
		label       : 'Type',
		name        : 'rpa_template_type',
		controlType : 'chips',
		value       : 'shipments_rpa',
		options     : getTemplatesOptions(),
		className   : cl.ns('element_styles'),
	},
	{
		name        : 'name',
		label       : 'Name',
		controlType : 'input',
		placeholder : 'Type name here...',
		width       : '300px',
		className   : cl.ns('element_styles'),
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
		className   : cl.ns('element_styles'),
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
		className   : cl.ns('element_styles'),
		placeholder : 'Select language here...',
		rules       : {
			required: true,
		},
	},
];

export default CREATE_CONFIG_TEMPLATE;
