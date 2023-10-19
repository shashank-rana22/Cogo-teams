import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getLclCustomscontrols = () => [
	{
		name        : 'service_provider_id',
		type        : 'async_select',
		label       : 'Service Provider',
		placeholder : 'Select Service Provider',
		asyncKey    : 'organizations',
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'location_ids',
		label       : 'Location',
		type        : 'async_select',
		placeholder : 'Select location',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['seaport', 'country'] } },
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'trade_type',
		label       : 'Trade Type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
		],
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi_select',
		placeholder : 'Select commodity',
		options     : getCommodityList('lcl_freight'),
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'is_line_items_error_messages_present',
		label       : 'Errors Messages Present ?',
		type        : 'select',
		span        : 12,
		isClearable : true,
		options     : [{ value: true, label: 'Yes' }],
		size        : 'sm',
	},
];

export default getLclCustomscontrols;
