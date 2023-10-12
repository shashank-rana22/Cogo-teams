const controls = [
	{
		name : 'halt_time_value',
		type : 'number',
		min  : 0,
	},
	{
		name        : 'halt_time_unit',
		type        : 'select',
		placeholder : 'Unit',
		options     : [
			{
				label : 'Days',
				value : 'days',
			},
			{
				label : 'Hours',
				value : 'hours',
			},
			{
				label : 'Minutes',
				value : 'minutes',
			},
		],
	},
];

export default controls;
