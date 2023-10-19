import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getLclFreightcontrols = () => [
	{
		name        : 'service_provider_id',
		type        : 'async_select',
		label       : 'Service Provider',
		placeholder : 'Select Service Provider',
		asyncKey    : 'organizations',
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'origin_port_id',
		label       : 'Origin port',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		placeholder : 'Select Origin port',
		params      : { filters: { type: ['seaport'] } },
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'destination_port_id',
		label       : 'Destination port',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		placeholder : 'Select Destination port',
		params      : { filters: { type: ['seaport'] } },
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi_select',
		placeholder : 'Select Commodity',
		span        : 12,
		size        : 'sm',
		options     : getCommodityList('lcl_freight'),
		isClearable : true,
	},
	{
		name        : 'is_rate_expired',
		label       : 'Is Rate Expired?',
		type        : 'select',
		options     : [{ value: true, label: 'Yes' }],
		span        : 12,
		isClearable : true,
		size        : 'sm',
	},
	{
		name        : 'missing_charges',
		label       : 'Missing Charges',
		type        : 'select',
		placeholder : 'Select Missing Charges',
		options     : [
			{
				label : 'Origin Storage Missing',
				value : 'is_origin_storage_missing',
			},
			{
				label : 'Destination Storage Missing',
				value : 'is_destination_storage_missing',
			},
			{
				label : 'Origin Charge Missing',
				value : 'is_origin_charge_missing',
			},
			{
				label : 'Destination Charge Missing',
				value : 'is_destination_charge_missing',
			},
		],
		isClearable : true,
		span        : 12,
		size        : 'sm',
	},
];

export default getLclFreightcontrols;
