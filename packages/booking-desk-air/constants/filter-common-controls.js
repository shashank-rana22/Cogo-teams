const filterCommonControls = (t = () => {}) => [
	{
		label   : t('airBookingDesk:label_tags'),
		name    : 'tags',
		type    : 'select',
		options : [
			{
				label : t('airBookingDesk:label_cogoverse'),
				value : 'cogoverse',
			},
		],
		isClearable : true,
		span        : 6,
	},
	{
		label          : t('airBookingDesk:label_customer_channel_partner'),
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
		placeholder : t('airBookingDesk:placeholder_customer_channel_partner'),
		isClearable : true,
		span        : 6,
	},

	{
		label       : t('airBookingDesk:label_raise_alarm'),
		name        : 'fault_alarms_raised',
		type        : 'select',
		placeholder : t('airBookingDesk:placeholder_raise_alarm'),
		options     : [
			{
				label : t('airBookingDesk:option_yes'),
				value : 'active',
			},
		],
		isClearable : true,
		span        : 6,
	},
];

export default filterCommonControls;
