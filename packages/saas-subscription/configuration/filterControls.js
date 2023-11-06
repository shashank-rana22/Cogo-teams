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

	},
	{
		name    : 'customer_type',
		type    : 'chips',
		label   : 'Customer type',
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
