import getGeoConstants from '@cogoport/globalization/constants/geo';

const getControls = ({ item }) => {
	const geo = getGeoConstants();
	return [
		{
			name         : 'extension_name',
			label        : 'Extension Name',
			type         : 'text',
			span         : 4,
			value        : item?.extension_name,
			showOptional : false,
			rules        : { required: 'This is required' },
			placeholder  : 'Type Extension Name',
		},
		{
			name    : 'trade_type',
			label   : 'Trade Type',
			type    : 'select',
			span    : 4,
			options : [
				{
					value : 'export',
					label : 'Export',
				},
				{
					value : 'import',
					label : 'Import',
				},
			],
			value       : item?.trade_type,
			isClearable : true,
			placeholder : 'Select Trade Type',
		},
		{
			name    : 'cluster_type',
			label   : 'Cluster Type',
			type    : 'select',
			span    : 4,
			value   : item?.cluster_type,
			options : [
				{ label: 'Location', value: 'location' },
				{ label: 'Commodity', value: 'commodity' },
				{ label: 'Container', value: 'container' },
			],
			placeholder: 'Cluster Type',
		},
		{
			name        : 'cluster_reference_name',
			label       : 'Cluster Reference Name',
			type        : 'select',
			value       : item?.cluster_reference_name,
			span        : 4,
			placeholder : 'Cluster Reference Name',
		},
		{
			name        : 'cluster_id',
			label       : 'Cluster',
			type        : 'select',
			value       : item?.cluster_id,
			span        : 4,
			placeholder : 'Cluster',
		},

		{
			name         : 'service_provider_id',
			placeholder  : 'Service Provider',
			label        : 'Service Provider',
			type         : 'async_select',
			value        : item?.service_provider_id,
			asyncKey     : 'organizations',
			initialCall  : true,
			isClearable  : true,
			span         : 4,
			showForScope : ['partner'],
			params       : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					exclude_ids  : [
						geo.uuid.cogo_freight_pvt_ltd_pr_supplier,
						geo.uuid.cogo_freight_supplier,
					],
				},
			},
		},
		{
			name        : 'shipping_line_id',
			label       : 'Shipping Line',
			type        : 'async_select',
			span        : 4,
			value       : item?.shipping_line_id,
			isClearable : true,
			asyncKey    : 'list_operators',
			placeholder : 'Shipping Line',
			initialCall : true,
			params      : {
				filters    : { operator_type: 'shipping_line', status: 'active' },
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
		},

		{
			name        : 'line_item_charge_code',
			label       : 'Line Item Charge Code',
			type        : 'select',
			span        : 4,
			valueKey    : 'code',
			labelKey    : 'label',
			value       : item?.line_item_charge_code,
			initialCall : true,
			placeholder : 'Line Item Charge code',
		},
		{
			name           : 'gri_currency',
			label          : 'Markup Currency',
			type           : 'async_select',
			span           : 4,
			value          : item?.gri_currency,
			optionsListKey : 'currencies',
			asyncKey   	   : 'list_exchange_rate_currencies',
			initialCall    : true,
			placeholder    : 'Markup Currency',
		},
		{
			name         : 'gri_rate',
			label        : 'Markup Rate',
			type         : 'number',
			span         : 4,
			value        : item?.gri_rate,
			priceKey     : 'price',
			showOptional : false,
			placeholder  : 'Markup Rate',
		},
	];
};
export default getControls;
