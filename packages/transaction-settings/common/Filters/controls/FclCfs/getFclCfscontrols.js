import CONTAINER_SIZE from '@cogoport/constants/container-sizes.json';
import CONTAINER_TYPES from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getFclCfscontrols = () => [
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
		name        : 'location_id',
		type        : 'async_select',
		label       : 'Port/Country',
		placeholder : 'Select Port/Country',
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
		name        : 'container_size',
		label       : 'Container_size',
		type        : 'select',
		placeholder : 'Select Container_size',
		options     : CONTAINER_SIZE,
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'container_type',
		label       : 'Container_type',
		type        : 'select',
		placeholder : 'Select Container_types',
		options     : CONTAINER_TYPES,
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi_select',
		placeholder : 'Select commodity',
		options     : getCommodityList('freight'),
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'is_line_items_info_messages_present',
		label       : 'Cfs Suggestion present?',
		type        : 'select',
		span        : 12,
		isClearable : true,
		options     : [{ value: true, label: 'Yes' }],
		size        : 'sm',
	},
	{
		name        : 'is_line_items_error_messages_present',
		label       : 'Cfs Error present?',
		type        : 'select',
		span        : 12,
		isClearable : true,
		options     : [{ value: true, label: 'Yes' }],
		size        : 'sm',
	},
];

export default getFclCfscontrols;
