const controls = [
	{
		label       : '',
		name        : 'is_read',
		controlType : 'checkboxGroup',
		options     : [
			{
				label : 'Unread',
				value : 'unread',
			},
		],
	},
	{
		label       : 'Importance',
		name        : 'importance',
		controlType : 'checkboxGroup',
		options     : [
			{
				label : 'Hight',
				value : 'high',
			},
			{
				label : 'Normal',
				value : 'normal',
			},
			{
				label : 'Low',
				value : 'low',
			},
		],
	},
];

export default controls;
