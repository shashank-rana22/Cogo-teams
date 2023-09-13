export const teamsOption = [
	{ label: 'Supply', value: 'supply' },
	{ label: 'Support', value: 'support' },
	{ label: 'Sales', value: 'sales' },
	{ label: 'Shipment Specialist', value: 'shipment_specialist' },
	{ label: 'Cp Support', value: 'cp_support' },
	{ label: 'Marketing', value: 'marketing' },
	{ label: 'Tech Support', value: 'tech_support' },
	{ label: 'Credit Controller', value: 'credit_controller' },
];

export const SHIFT_CONFIGURATION_HEADING = [
	{
		label : 'Shift Name',
		key   : 'shift_name',
	},
	{
		label : 'Start Time',
		key   : 'start_time',
	},
	{
		label : 'End Time',
		key   : 'end_time',
	},
];

export const CONTROLS = [
	{
		label  : 'Morning Shift',
		key    : 'morning_shift',
		fields : [
			'morning_shift_start_time',
			'morning_shift_end_time',
		],
	},
	{
		label  : 'Afternoon Shift ',
		key    : 'afternoon_shift',
		fields : [
			'afternoon_shift_start_time',
			'afternoon_shift_end_time',
		],
	},
	{
		label  : 'Night Shift',
		key    : 'night_shift',
		fields : [
			'night_shift_start_time',
			'night_shift_end_time',
		],
	},
];
