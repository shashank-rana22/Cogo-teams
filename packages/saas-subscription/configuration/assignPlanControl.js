const getAssignPlanControl = ({ t }) => [
	{
		name        : 'organizationId',
		label       : t('saasSubscription:assign_plan_config_org'),
		type        : 'asyncSelect',
		placeholder : t('saasSubscription:assign_plan_config_org'),
		asyncKey    : 'organizations',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'planId',
		label       : t('saasSubscription:assign_plan_config_plan'),
		type        : 'asyncSelect',
		placeholder : t('saasSubscription:assign_plan_config_plan'),
		asyncKey    : 'plan_pricing_list',
		params      : {
			filters    : { is_active: true, plan_type: 'P' },
			page_limit : 50,
		},
		rules: {
			required: true,
		},
	},
];

export default getAssignPlanControl;
