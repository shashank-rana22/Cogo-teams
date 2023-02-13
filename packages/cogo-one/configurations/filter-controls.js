const controls = [
	{
		name    : 'status',
		span    : 4,
		type    : 'radio',
		options : [
			{
				label : 'Unread',
				value : 'unread',
			},
			{
				label : 'All',
				value : 'all',
			},
		],
	},
	{
		name    : 'channels',
		type    : 'checkbox',
		span    : 4,
		options : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Facebook', value: 'facebook' },
			{ label: 'Instagram', value: 'instagram' },
			{ label: 'Mail', value: 'mail' }],
		className : 'custom-checkbox',
		multiple  : true,
	},
	{
		name    : 'tags',
		span    : 4,
		type    : 'radio',
		options : [
			{
				label : 'Preshipped',
				value : 'preshipped',
			},
			{
				label : 'Ongoing',
				value : 'ongoing',
			},
			{
				label : 'Postshipped',
				value : 'postshipped',
			},
		],
	},
	{
		name    : 'priority',
		span    : 4,
		type    : 'radio',
		options : [
			{
				label : 'High !!!',
				value : 'high',
			},
			{
				label : 'Medium !!',
				value : 'medium',
			},
			{
				label : 'Low !',
				value : 'low',
			},
		],
	},
];

export default controls;
