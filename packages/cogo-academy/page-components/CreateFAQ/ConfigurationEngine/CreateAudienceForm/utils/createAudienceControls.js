/* eslint-disable no-mixed-spaces-and-tabs */
import SUB_FUNCTION_MAPPING from './subFunctionMappings';
import WORK_SCOPES_OPTIONS from './workScopeMappings';

const PLATFORM_OPTIONS = [{ label: 'Admin', value: 'admin' },
	{ label: 'App', value: 'app' },
	{ label: 'Partner', value: 'partner' },
	{ label: 'All', value: 'all' }];

const AUTH_FUNCTION_OPTIONS = [{ label: 'Sales', value: 'sales' },
	{ label: 'Supply', value: 'supply' },
	{ label: 'Operations', value: 'operations' },
	{ label: 'Finance', value: 'finance' }];

const createQuestionControls = ({ watchFunctions, entity_options }) => {
	const controls = [
		{
			name        : 'name',
			type        : 'text',
			span        : 2,
			label       : 'Audience Name',
			placeholder : 'Enter name of the user group',
			rules       : {
				required: 'Audience name is required',
			},
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
			placeholder : 'Select country',
		},

		{
			name        : 'platform',
			label       : 'Platform',
			type        : 'select',
			span        : 2,
			options     : PLATFORM_OPTIONS,
			placeholder : 'Select Platform',
			rules       : {
				required: 'Platform is required',
			},
		},

		{
			name        : 'persona',
			label       : 'Work Scopes',
			type        : 'select',
			span        : 2,
			placeholder : 'Select Work Scopes',
			options     : WORK_SCOPES_OPTIONS,
		},

		{
			name        : 'auth_function',
			label       : 'Functions',
			type        : 'select',
			span        : 2,
			options     : AUTH_FUNCTION_OPTIONS,
			placeholder : 'Select Functions',
			rules       : {
				required: 'Function is required',
			},
		},

		{
			name        : 'auth_sub_function',
			label       : 'Sub Functions',
			type        : 'select',
			span        : 1,
			options     : SUB_FUNCTION_MAPPING[watchFunctions],
			placeholder : 'Select Sub Functions',
			rules       : {
				required: 'Sub function is required',
			},
		},
	];

	return { controls };
};

export default createQuestionControls;
