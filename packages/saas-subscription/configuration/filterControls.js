const filterControls = [
	{
		name        : 'plan_ids',
		type        : 'asyncSelect',
		label       : 'Select Plan',
		placeholder : 'Select Plan',
		multiple    : true,
		asyncKey    : 'list_saas_plan',
		initialCall : true,
		size        : 'sm',
		// rules       : { required: true },
	},
	{
		name    : 'customer_type',
		type    : 'chips',
		label   : 'Account type',
		options : [
			{
				key      : 'importer_exporter',
				children : 'IE',
			},
			{
				key      : 'channel_partner',
				children : 'CP',
			},
		],
	},
];

export default filterControls;
