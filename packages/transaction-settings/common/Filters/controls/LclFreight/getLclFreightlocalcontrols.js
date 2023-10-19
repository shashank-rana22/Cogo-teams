import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

const getLclFreightlocalcontrols = () => [
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
		name        : 'pincode_id',
		label       : 'Pincode',
		type        : 'async_select',
		placeholder : 'Select Pincode',
		asyncKey    : 'list_locations',
		span        : 12,
		params      : { filters: { type: ['pincode'] } },
		isClearable : true,
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async_select',
		placeholder    : 'Select Shipping Line',
		asyncKey       : 'list_operators',
		params         : { filters: { operator_type: 'shipping_line' } },
		span           : 12,
		defaultOptions : true,
		caret          : true,
		multiple       : false,
		isClearable    : true,
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
		name          : 'commodity',
		label         : 'Commodity',
		type          : 'multi_select',
		placeholder   : 'Select Commodity',
		span          : 12,
		options       : getCommodityList('lcl_freight'),
		commodityType : 'lcl_freight',
		caret         : true,
		isClearable   : true,
	},
	{
		name        : 'is_line_items_info_messages_present',
		label       : 'Info Messages Present ?',
		type        : 'select',
		span        : 12,
		caret       : true,
		options     : [{ value: true, label: 'Yes' }],
		isClearable : true,
	},
	{
		name        : 'is_line_items_error_messages_present',
		label       : 'Error Messages Present ?',
		type        : 'select',
		span        : 12,
		caret       : true,
		options     : [{ value: true, label: 'Yes' }],
		isClearable : true,
	},
];

export default getLclFreightlocalcontrols;
