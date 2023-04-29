const controls = [
	{
		name  : 'active_date_range',
		label : 'Set Interval',
		type  : 'dateRangePicker',
		rules : {
			required: 'Interval is Required',
		},
		isPreviousDaysAllowed: false,
	},
];

export default controls;
