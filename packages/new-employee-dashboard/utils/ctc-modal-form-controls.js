const NUMBER = 590000;

const controls = [
	{
		yearly: {
			name        : 'joining_bonus_yearly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Yearly',

		},

		monthly: {
			name        : 'joining_bonus_monthly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Monthly',

		},
	},
	{
		yearly: {
			name        : 'retention_bonus_yearly',
			label       : 'Retention Bonus',
			type        : 'number',
			placeholder : 'Add Retention Bonus Yearly',

		},

		monthly: {
			name        : 'retention_bonus_monthly',
			label       : 'Retention Bonus',
			type        : 'number',
			placeholder : 'Add Retention Bonus Monthly',

		},
	},
	{
		yearly: {
			name        : 'performance_linked_variable_yearly',
			label       : 'Performance Linked Variable',
			type        : 'number',
			placeholder : 'Add Performance Linked Variable Yearly',

		},

		monthly: {
			name        : 'performance_linked_variable_monthly',
			label       : 'Performance Linked Variable',
			type        : 'number',
			placeholder : 'Add Performance Linked Variable Monthly',

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

		},

		monthly: {
			name        : 'joining_bonus_monthly',
			label       : 'Joining Bonus',
			type        : 'number',
			placeholder : 'Add Joining Bonus Monthly',

		},
	},
	{
		yearly: {
			name        : 'sign_on_bonus_yearly',
			label       : 'SignOn Bonus',
			type        : 'number',
			placeholder : 'Add SignOn Bonus Yearly',

		},

		monthly: {
			name        : 'sign_on_bonus_monthly',
			label       : 'SignOn Bonus',
			type        : 'number',
			placeholder : 'Add SignOn Bonus Monthly',

		},
	},

];

const getControls = (type) => {
	if (Number(type) >= NUMBER) {
		return controls;
	}
	return lessControls;
};

export default getControls;
