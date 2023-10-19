import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getLclFreightsurchargescontrols = () => [
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
		name        : 'origin_location_id',
		label       : 'Origin',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		placeholder : 'Select Origin',
		span        : 12,
		params      : { filters: { type: ['seaport', 'country', 'trade', 'continent'] } },
		isClearable : true,
	},
	{
		name        : 'destination_location_id',
		label       : 'Destination',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		placeholder : 'Select Destination',
		span        : 12,
		params      : { filters: { type: ['seaport', 'country', 'trade', 'continent'] } },
		isClearable : true,
		caret       : true,
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi_select',
		placeholder : 'Select Commodity',
		options     : getCommodityList('lcl_freight'),
		span        : 12,
		isClearable : true,
		caret       : true,
	},
];

export default getLclFreightsurchargescontrols;
