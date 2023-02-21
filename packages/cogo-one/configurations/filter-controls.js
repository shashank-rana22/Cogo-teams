const controls = [
	{
		label     : '',
		name      : 'status',
		type      : 'radio',
		className : 'status_field_controller',
		value     : '',
		options   : [
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
		label     : 'Channels',
		name      : 'channels',
		type      : 'checkboxgroup',
		className : 'channels_field_controller',
		multiple  : true,
		value     : [],
		options   : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Platform Chat', value: 'platform_chat' },
		],
	},
	{
		label     : 'Tags',
		name      : 'tags',
		type      : 'radio',
		value     : '',
		className : 'tags_field_controller',
		options   : [
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
		label     : 'Escalation',
		name      : 'escalation',
		type      : 'radio',
		value     : '',
		className : 'escalation_field_controller',
		options   : [
			{
				label : 'Warning',
				value : 'warning',
			},
			{
				label : 'Escalated',
				value : 'escalated',
			},

		],
	},
];

export default controls;
