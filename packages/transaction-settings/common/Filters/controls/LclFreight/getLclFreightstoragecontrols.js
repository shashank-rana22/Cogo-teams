import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getLclFreightstoragecontrols = () => [
	{
		name        : 'service_provider_id',
		type        : 'async_select',
		label       : 'Service Provider',
		placeholder : 'Select Service Provider',
		asyncKey    : 'organizations',
		span        : 12,
		size        : 'sm',
		isClearable : true,
	},
	{
		name        : 'port_id',
		label       : 'Port/City/Country',
		type        : 'async_select',
		placeholder : 'Select Port/City/Country',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['seaport', 'country', 'trade', 'continent'] } },
		span        : 12,
		isClearable : true,
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
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi_select',
		placeholder : 'Select Commodity',
		options     : getCommodityList('lcl_freight'),
		span        : 12,
		isClearable : true,
	},
	{
		name        : 'is_slabs_missing',
		label       : 'Is Slab Missing ?',
		type        : 'select',
		span        : 12,
		caret       : true,
		options     : [{ value: true, label: 'Yes' }],
		isClearable : true,
	},
];

export default getLclFreightstoragecontrols;
