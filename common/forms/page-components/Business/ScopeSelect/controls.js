export const notIncludeAgent = ['partner_application', 'partner', 'user'];

const agent = (navigation, formValues, showAgent) => (!notIncludeAgent.includes(navigation) && showAgent
	? [
		{
			label          : 'Choose Agent',
			name           : 'agent_id',
			type           : 'select-2',
			span           : 12,
			optionsListKey : 'partner-users',
			defaultOptions : true,
			isClearable    : true,
			valueKey       : 'user_id',
			labelKey       : 'name',
			value          : formValues?.agent_id,
			show           : (fields) => ['team', 'all', 'channel_partner_team', 'across_all'].includes(
				fields?.scope?.value,
			),
			params: { filters: { status: 'active' } },
		},
	]
	: []);

const controls = (data, formValues, navigation, showAgent) => [
	{
		name       : 'scope',
		type       : 'select-2',
		caret      : true,
		span       : 12,
		label      : 'Select Scope',
		selectType : 'pills',
		value      : formValues?.scope || data?.scope,
		options    : data?.scopeOptions,
	},
	{
		name       : 'through_criteria',
		type       : 'select-2',
		caret      : true,
		span       : 12,
		label      : 'Select View',
		selectType : 'pills',
		show       : data?.viewTypes?.[formValues.scope]?.length > 0,
		value      : formValues?.through_criteria || data?.through_criteria,
		options    : data?.viewTypes?.[formValues.scope],
	},
	...agent(navigation, formValues, showAgent),
];
export default controls;
