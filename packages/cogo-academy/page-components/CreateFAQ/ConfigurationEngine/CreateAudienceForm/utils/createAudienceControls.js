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
	{ label: 'Finance', value: 'finance' },
	{ label: 'All', value: 'all' },
];

const PERSONA_OPTIONS = [
	{ label: 'Channel Partner', value: 'channel_partner' },
	{ label: 'Service Provider', value: 'service_provider' },
	{ label: 'All', value: 'all' },
];

const createQuestionControls = ({ watchFunctions, entity_options, countryOptions }) => {
	const controls = [
		{
			name        : 'name',
			type        : 'text',
			label       : 'Audience Name',
			placeholder : 'Enter name of the user group',
			rules       : {
				required: 'Audience name is required',
			},
		},
		{
			name        : 'cogo_entity_id',
			type        : 'select',
			label       : 'Cogo Entity',
			options     : entity_options,
			placeholder : 'Select Cogo Entity',
		},

		{
			name        : 'country_id',
			label       : 'Country',
			type        : 'select',
			options     : countryOptions,
			placeholder : 'Select country',
		},

		{
			name        : 'platform',
			label       : 'Platform',
			type        : 'select',
			options     : PLATFORM_OPTIONS,
			placeholder : 'Select Platform',
			rules       : {
				required: 'Platform is required',
			},
		},

		{
			name        : 'work_scope',
			label       : 'Work Scopes',
			type        : 'select',
			placeholder : 'Select Work Scopes',
			options     : WORK_SCOPES_OPTIONS,
		},

		{
			name        : 'persona',
			label       : 'Persona',
			type        : 'select',
			placeholder : 'Select Persona',
			options     : PERSONA_OPTIONS,
			rules       : {
				required: 'Persona is required',
			},
		},

		{
			name        : 'auth_function',
			label       : 'Functions',
			type        : 'select',
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
