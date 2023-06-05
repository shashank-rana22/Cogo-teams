const controls = [
	{
		yearly: {
			name        : 'joining_bonus_yearly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Yearly',
			rules       : {
				required: { value: true, message: 'Yearly Joining Bonus is required' },
			},
		},

		monthly: {
			name        : 'joining_bonus_monthly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Monthly',
			rules       : {
				required: { value: true, message: 'Monthly Joining Bonus is required' },
			},
		},
	},
	{
		yearly: {
			name        : 'retention_bonus_yearly',
			label       : 'Retention Bonus',
			type        : 'number',
			placeholder : 'Add Retention Bonus Yearly',
			rules       : {
				required: { value: true, message: 'Yearly Retention Bonus is required' },
			},
		},

		monthly: {
			name        : 'retention_bonus_monthly',
			label       : 'Retention Bonus',
			type        : 'number',
			placeholder : 'Add Retention Bonus Monthly',
			rules       : {
				required: { value: true, message: 'Monthly Retention Bonus is required' },
			},
		},
	},
	{
		yearly: {
			name        : 'performance_linked_variable_yearly',
			label       : 'Performance Linked Variable',
			type        : 'number',
			placeholder : 'Add Performance Linked Variable Yearly',
			rules       : {
				required: { value: true, message: 'Yearly Performance Linked Variable is required' },
			},
		},

		monthly: {
			name        : 'performance_linked_variable_monthly',
			label       : 'Performance Linked Variable',
			type        : 'number',
			placeholder : 'Add Performance Linked Variable Monthly',
			rules       : {
				required: { value: true, message: 'Monthly Performance Linked Variable is required' },
			},
		},
	},
];

const lessControls = [
	{
		yearly: {
			name        : 'joining_bonus_yearly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Yearly',
			rules       : {
				required: { value: true, message: 'Yearly Joining Bonus is required' },
			},
		},

		monthly: {
			name        : 'joining_bonus_monthly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Monthly',
			rules       : {
				required: { value: true, message: 'Monthly Joining Bonus is required' },
			},
		},
	},
	{
		yearly: {
			name        : 'sign_on_bonus_yearly',
			label       : 'SignOn Bonus',
			type        : 'number',
			placeholder : 'Add SignOn Bonus Yearly',
			rules       : {
				required: { value: true, message: 'Yearly SignOn Bonus is required' },
			},
		},

		monthly: {
			name        : 'sign_on_bonus_monthly',
			label       : 'SignOn Bonus',
			type        : 'number',
			placeholder : 'Add SignOn Bonus Monthly',
			rules       : {
				required: { value: true, message: 'Monthly SignOn Bonus is required' },
			},
		},
	},

];

const getControls = (type) => {
	if (Number(type) > 600000) {
		return controls;
	}
	return lessControls;
};

export default getControls;
