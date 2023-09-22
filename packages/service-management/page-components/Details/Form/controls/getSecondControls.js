const getSecondControls = ({ supply_agent = '' }) => {
	const controls = [

		{
			name     : 'supply_agent',
			type     : 'input',
			value    : supply_agent,
			span     : 12,
			label    : 'Supply Agent',
			disabled : true,
		},

		{
			name        : 'cooling_days',
			placeholder : '0 days',
			type        : 'number',
			span        : 12,
			label       : 'Cooling Period',
		},

	];
	return controls;
};
export default getSecondControls;
