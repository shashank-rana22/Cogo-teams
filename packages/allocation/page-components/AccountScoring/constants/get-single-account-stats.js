const SINGLE_ACCOUNT_STATS = [
	{
		detail_key   : 'kam_details',
		detail_label : 'KAM Details',
		stats        : [
			{
				key   : 'stakeholder_name',
				label : 'KAM',
				flex  : 1.5,
			},
			{
				key   : 'manager_name',
				label : 'Manager',
				flex  : 1.5,
			},
			{
				key   : 'role',
				label : 'Role',
				flex  : 1.5,
			},
			{
				key   : 'last_booking',
				label : 'Last Transaction',
				flex  : 1,
			},
		],
	},
	{
		detail_key   : 'organisation_details',
		detail_label : 'Organisation Details',
		stats        : [
			{
				key   : 'allocated_at',
				label : 'Allocated at',
				flex  : 1,
			},
			{
				key   : 'segment',
				label : 'Segment',
				flex  : 1,
			},
			{
				key   : 'business_name',
				label : 'Organization Name',
				flex  : 2.5,
			},
			{
				key   : 'user_name',
				label : 'User Name',
				flex  : 1.5,
			},
			{
				key   : 'warmth',
				label : 'Warmth',
				flex  : 1,
			},
		],
	},

];

export default SINGLE_ACCOUNT_STATS;
