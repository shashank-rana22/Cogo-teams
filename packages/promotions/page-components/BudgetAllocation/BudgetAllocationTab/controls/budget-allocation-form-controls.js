const BudgetAllocationControls = [
	{
		name        : 'budget_amount',
		label       : 'Budget to be allocated',
		type        : 'number',
		placeholder : 'Amount',
		showLabel   : false,
		span        : 3,
		rules       : {
			required: 'Amount is required',
		},
	},
	{
		name        : 'frequency',
		label       : 'Duration',
		type        : 'select',
		placeholder : 'Period',
		span        : 3,
		rules       : {
			required: 'Duration is required',
		},
		options: [
			{
				label : 'Weekly',
				value : 'week',
			},
			{
				label : 'Yearly',
				value : 'year',
			},
			{
				label : 'Monthly',
				value : 'month',
			},
			{
				label : 'Quarterly',
				value : 'quarter',
			},
		],
	},
	{
		name        : 'role_ids',
		label       : 'Roles',
		type        : 'async_select',
		asyncKey    : 'partner_roles',
		initialCall : true,
		labelKey    : 'name',
		valueKey    : 'id',
		placeholder : 'Select roles',
		span        : 3,
		params      : {
			permissions_data_required: false,
		},
		rules: {
			required: 'Role is required',
		},
		defaultOptions: true,
	},
];
export default BudgetAllocationControls;
