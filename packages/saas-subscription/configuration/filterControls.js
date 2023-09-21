const filterControls = [
	{
		name        : 'plan_id',
		type        : 'asyncSelect',
		label       : 'Select Plan',
		placeholder : 'Select Plan',
		multiple    : true,
		asyncKey    : 'list_saas_plan',
		initialCall : true,
		isClearable : true,
		size        : 'sm',
		rules       : { required: true },
	},
];

export default filterControls;
