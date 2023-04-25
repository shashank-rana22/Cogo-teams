const controls = [
	{
		name                  : 'date',
		label                 : 'Select Date',
		type                  : 'datePicker',
		dateFormat            : 'dd-MMMM-yyyy',
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},
	{
		name        : 'segment_id',
		label       : 'Segment Type',
		placeholder : 'Type segment here...',
		type        : 'asyncSelect',
		asyncKey    : 'segments',
		initialCall : false,
		params      : {
			segment_type         : 'global',
			status               : 'active',
			is_lead_user_segment : false,
		},
		isClearable: true,
	},
	{
		name        : 'kam',
		label       : 'KAM',
		placeholder : 'Type here',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users',
		initialCall : true,
		isClearable : true,
	},
	{
		name        : 'organization',
		label       : 'Account/Serial ID',
		placeholder : 'Type here',
		type        : 'asyncSelect',
		asyncKey    : 'organizations',
		params      : {
			sort_type           : 'desc',
			sort_by             : 'created_at',
			page_limit          : 50,
			agent_data_required : true,
			page                : 1,
			filters             : {
				is_channel_partner : false,
				account_type       : 'importer_exporter',
			},
		},
		isClearable: true,
	},
];
export default controls;
