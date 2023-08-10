const MAIL_FILTERS = [
	{
		label       : 'Mail Type',
		name        : 'mail_type',
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
				label : 'High',
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

export default MAIL_FILTERS;
