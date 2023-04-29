const controls = [
	{
		name                  : 'date',
		label                 : 'Select Date',
		type                  : 'datePicker',
		dateFormat            : 'dd-MMMM-yyyy',
		value                 : new Date(),
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},
	{
		name        : 'user_id',
		label       : 'KAM',
		placeholder : 'Select KAM Agent',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users',
		initialCall : true,
		isClearable : true,
	},
	{
		name        : 'organization',
		label       : 'Account/Serial ID',
		placeholder : 'Select Account/Serial ID',
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
