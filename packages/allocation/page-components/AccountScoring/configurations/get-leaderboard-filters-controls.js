import DURATION_OPTIONS from './duration-options';

const controls = [
	{
		name        : 'warmth',
		label       : 'Warmth',
		type        : 'multiSelect',
		placeholder : 'Select Warmth',
		options     : [
			{ label: 'Ice Cold', value: 'ice_cold' },
			{ label: 'Cold', value: 'cold' },
			{ label: 'Warm', value: 'warm' },
			{ label: 'Hot', value: 'hot' },
			{ label: 'Flaming Hot', value: 'flaming_hot' },
		],
		isClearable: true,
	},
	{
		name        : 'segment',
		label       : 'Segment',
		type        : 'multiSelect',
		placeholder : 'Select Segment',
		options     : [
			{ label: 'Long Tail', value: 'long_tail' },
			{ label: 'Mid Size', value: 'mid_size' },
			{ label: 'Enterprise', value: 'enterprise' },
			{ label: 'Channel Partner', value: 'channel_partner' },
		],
		isClearable: true,
	},
	{
		name        : 'service',
		label       : 'Service',
		type        : 'select',
		placeholder : 'Select service',
		options     : [
			{ value: 'organization', label: 'Organization' },
			{ value: 'lead_organization', label: 'Lead Organization' },
		],
		isClearable: true,
	},
	{
		name        : 'role_id',
		label       : 'Role',
		placeholder : 'Select Role',
		type        : 'asyncSelect',
		multiple    : true,
		asyncKey    : 'partner_roles',
		initialCall : false,
		isClearable : true,
		disabled    : true,

	},
	{
		name        : 'user_id',
		label       : 'KAM',
		placeholder : 'Select KAM Agent',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		params      : {
			filters: {
				partner_entity_types : ['cogoport'],
				status               : 'active',
			},
		},
		multiple    : true,
		initialCall : true,
		isClearable : true,
		disabled    : true,
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
		},
		isClearable: true,
	},
	{
		name        : 'duration',
		label       : 'Duration',
		placeholder : 'Select Duration',
		type        : 'select',
		options     : DURATION_OPTIONS,
		isClearable : true,
	},
	{
		name                  : 'date_range',
		label                 : 'Date Range',
		type                  : 'dateRangePicker',
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		disable               : true,
	},
];
export default controls;
