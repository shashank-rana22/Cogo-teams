const controls = [
	{
		name    : 'users_list',
		label   : 'Select Users to appear for Retest',
		type    : 'radio',
		options : [
			{ value: 'all', label: 'All' },
			{ value: 'custom', label: 'On the basis of Test' },
		],
		rules: {
			required: 'Users selection is required',
		},
	},
	{
		label     : 'Channels',
		name      : 'channels',
		type      : 'checkboxgroup',
		show      : false,
		className : 'channels_field_controller',
		multiple  : true,
		options   : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Platform Chat', value: 'platform_chat' },
			{ label: 'Telegram', value: 'telegram' },
		],

	},
	{
		name    : 'is_percentile_editable',
		label   : 'Allow edits to Published Percentile',
		type    : 'radio',
		options : [
			{ value: 'true', label: 'Yes' },
			{ value: 'false', label: 'No' },
		],
		rules: {
			required: 'is percentile editable is required',
		},
	},
	{
		name           : 'test_validity',
		label          : 'Retest Validity',
		type           : 'date-picker',
		showTimeSelect : true,
		rules          : { required: 'This is required' },
	},
];

export default controls;
