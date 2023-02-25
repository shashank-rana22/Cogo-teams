/* eslint-disable no-mixed-spaces-and-tabs */
import SUB_FUNCTION_MAPPING from './subFunctionMappings';
import WORK_SCOPES_OPTIONS from './workScopeMappings';

const createQuestionControls = ({ watchFunctions, entity_options }) => {
	const controls = [
		{
			name        : 'name',
			type        : 'text',
			span        : 2,
			label       : 'Name of the user group',
			placeholder : 'Enter anme of the user group',
		},
		{
			name        : 'cogo_entity_id',
			type        : 'select',
			span        : 2,
			label       : 'Cogo Entity',
			options     : entity_options,
			placeholder : 'Select Cogo Entity',
		},

		{
			name        : 'country_id',
			label       : 'Country',
			type        : 'select',
			span        : 2,
			options     : [{ label: 'IN', value: '541d1232-58ce-4d64-83d6-556a42209eb7' }],
			placeholder : 'Select country',
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
			name        : 'persona',
			label       : 'Work Scopes',
			type        : 'select',
			span        : 2,
			placeholder : 'Select Work Scopes',
			options     : WORK_SCOPES_OPTIONS,
			rules       : { required: 'This is required' },
		},

		{
			name    : 'auth_function',
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
			name        : 'auth_sub_function',
			label       : 'Sub Functions',
			type        : 'select',
			span        : 1,
				 options     : SUB_FUNCTION_MAPPING[watchFunctions],
			placeholder : 'Select Sub Functions',
		},
	];

	return { controls };
};

export default createQuestionControls;
