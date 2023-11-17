import containerSize from '@cogoport/constants/container-sizes.json';
import containertypes from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

export default function getLclFreightControls({ type = '' }) {
	const freightOptions = getCommodityList('lcl_freight');
	const lcl_freight_local = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			span     : 2,
			type     : 'select',
			watch    : true,
			disabled : type === 'edit',
			options  : [
				{ label: 'Import', value: 'import' },
				{ label: 'Export', value: 'export' },
			],
		},
		{
			label       : 'Origin Location',
			name        : 'origin_location_id',
			span        : 2,
			placeholder : 'Select Origin',
			type        : 'async_select',
			initialCall : true,
			asyncKey    : 'list_locations',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			params      : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			span        : 2,
			placeholder : 'Select Destination',
			type        : 'async_select',
			caret       : true,
			initialCall : true,
			asyncKey    : 'list_locations',
			watch       : true,
			disabled    : type === 'edit',
			params      : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			name           : 'shipping_line_id',
			span           : 2,
			label          : 'Shipping line',
			type           : 'async_select',
			caret          : true,
			defaultOptions : true,
			watch          : true,
			initialCall    : true,
			disabled       : type === 'edit',
			asyncKey       : 'list_operators',
			placeholder    : 'Select Shipping Line',

		},
		{
			label       : 'Container Size',
			name        : 'container_size',
			span        : 2,
			type        : 'select',
			caret       : true,
			placeholder : 'Select Container Size',
			watch       : true,
			disabled    : type === 'edit',
			options     : containerSize,

		},
		{
			label       : 'Container Type',
			name        : 'container_type',
			span        : 2,
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			placeholder : 'Select Container Type',
			watch       : true,
			disabled    : type === 'edit',
			options     : containertypes,

		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			span        : 2,
			type        : 'select',
			caret       : true,
			placeholder : 'Select Commodity',
			watch       : true,
			disabled    : type === 'edit',
			options     : freightOptions,

		},
	];
	return { lcl_freight_local };
}
