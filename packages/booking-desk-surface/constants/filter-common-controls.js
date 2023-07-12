import SHIPMENT_STATES from './shipment-states';

const filterCommonControls = [
	{
		label   : 'Tags',
		name    : 'tags',
		type    : 'select',
		options : [
			{
				label : 'Cogoverse',
				value : 'cogoverse',
			},
		],
		isClearable : true,
		span        : 6,
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
		isClearable : true,
		span        : 6,
	},

	{
		label       : 'Raised Alarm?',
		name        : 'fault_alarms_raised',
		type        : 'select',
		placeholder : 'Select status',
		options     : [
			{
				label : 'YES',
				value : 'active',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'select',
		placeholder : 'Select state',
		options     : SHIPMENT_STATES,
		// isClearable : true,
		span        : 6,
	},
];

export default filterCommonControls;
