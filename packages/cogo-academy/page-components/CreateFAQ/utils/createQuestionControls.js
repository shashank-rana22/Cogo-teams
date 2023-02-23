/* eslint-disable no-mixed-spaces-and-tabs */
import SUB_FUNCTION_MAPPING from './subFunctionMappings';
import WORK_SCOPES_OPTIONS from './workScopeMappings';

const createQuestionControls = ({ watchFunctions, entity_options }) => [{
	type        : 'fieldArray',
	name        : 'fieldArray',
	showButtons : true,
	heading     : '',
	value       : [
		{
			cogo_entity   : '',
			country_id    : '',
			platform      : '',
			work_scopes   : '',
			functions     : '',
			sub_functions : '',
		},
	],
	buttonText         : 'Add More',
	noDeleteButtonTill : 1,
	controls           : [
		{
			name        : 'cogo_entity',
			type        : 'select',
			span        : 2,
			label       : 'Cogo Entity',
			options     : entity_options,
			placeholder : 'Select Cogo Entity',
		},
		{
			name        : 'country_id',
			label       : 'Country Id',
			type        : 'select',
			span        : 2,
			options     : [{ label: 'IN', value: '541d1232-58ce-4d64-83d6-556a42209eb7' }],
			placeholder : 'Select unit',
		},
		{
			name    : 'platform',
			label   : 'Platform',
			type    : 'select',
			span    : 2,
			options : [{ label: 'Admin', value: 'admin' },
				{ label: 'App', value: 'app' },
				{ label: 'Partner', value: 'partner' },
				{ label: 'All', value: 'all' }],
			placeholder : 'Select Platform',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'work_scopes',
			label       : 'Work Scopes',
			type        : 'select',
			span        : 2,
			placeholder : 'Select Work Scopes',
			options     : WORK_SCOPES_OPTIONS,
			rules       : { required: 'This is required' },
		},
		{
			name    : 'functions',
			label   : 'Functions',
			type    : 'select',
			span    : 2,
			options : [{ label: 'Sales', value: 'sales' },
				{ label: 'Supply', value: 'supply' },
				{ label: 'Operations', value: 'operations' },
				{ label: 'Finance', value: 'finance' }],
			placeholder : 'Select Functions',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'sub_functions',
			label       : 'Sub Functions',
			type        : 'select',
			span        : 1,
				 options     : SUB_FUNCTION_MAPPING[watchFunctions],
			placeholder : 'Select Sub Functions',
		},
	],
}];

export default createQuestionControls;
