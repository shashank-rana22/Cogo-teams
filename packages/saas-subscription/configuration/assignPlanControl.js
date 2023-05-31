const assignPlanControl = [
	{
		name        : 'organizationId',
		label       : 'Select Organization',
		type        : 'asyncSelect',
		placeholder : 'Select Organization',
		asyncKey    : 'organizations',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'planId',
		label       : 'Select Plan',
		type        : 'asyncSelect',
		placeholder : 'Select Plan',
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

export default assignPlanControl;
