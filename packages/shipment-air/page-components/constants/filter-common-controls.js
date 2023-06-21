const filterCommonControls = [
	{
		label    : 'Tags',
		name     : 'tags',
		type     : 'select',
		multiple : true,
		span     : 12,
		options  : [
			{
				label : 'Cogoverse',
				value : 'cogoverse',
			},
		],
		isClearable: true,
	},
	{
		label          : 'Customer/Channel Partner',
		name           : 'importer_exporter_id',
		type           : 'select',
		className      : 'primary md',
		optionsListKey : 'organizations',
		params         : {
			page_limit : 10,
			filters    : {
				account_type : 'importer_exporter',
				kyc_status   : 'verified',
			},
			agent_data_required: false,
		},
		placeholder : 'Select Customer/Channel Partner',
		caret       : true,
		isClearable : true,
		span        : 12,
	},

	{
		label       : 'Raised Alarm?',
		name        : 'fault_alarms_raised',
		type        : 'select',
		className   : 'primary md',
		placeholder : 'Select status',
		options     : [
			{
				label : 'YES',
				value : 'active',
			},
		],
		isClearable: true,
	},
];

export default filterCommonControls;
