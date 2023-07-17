const controls = [
	{
		label       : 'Mail Type',
		name        : 'is_read',
		controlType : 'radio',
		options     : [
			{
				label : 'All',
				value : 'all',
			},
			{
				label : 'Unread',
				value : 'unread',
			},
		],
	},
	{
		label       : 'Importance',
		name        : 'importance',
		controlType : 'radio',
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
