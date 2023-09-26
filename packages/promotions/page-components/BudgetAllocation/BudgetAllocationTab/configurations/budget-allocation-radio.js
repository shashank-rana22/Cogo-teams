const RadioOptions = [
	{
		name      : 'radio',
		type      : 'radio',
		className : 'primary md',
		theme     : 'admin',
		rules     : {
			required: true,
		},
		options: [
			{
				label : 'Allocate budget after completion of active budget',
				value : 'allocate_budget_after_completion_of_active_budget',
			},
			{
				label : 'Deactivate the active budget and allocate',
				value : 'deactivate_the_active_budget_and_allocate',
			},
		],
	},
];
export default RadioOptions;
