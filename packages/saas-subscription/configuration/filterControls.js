const filterControls = [
	{
		name        : 'plan_ids',
		type        : 'asyncSelect',
		label       : 'Select Plan',
		placeholder : 'Select Plan',
		multiple    : true,
		asyncKey    : 'list_saas_plan',
		initialCall : true,
		size        : 'sm',
		rules       : { required: true },
	},
];

export default filterControls;
