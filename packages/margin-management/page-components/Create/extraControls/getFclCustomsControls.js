import containerSize from '@cogoport/constants/container-sizes.json';
import containertypes from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

export default function getFclCustomsControls({ type = '' }) {
	const freightOptions = getCommodityList('freight');
	const localOptions = getCommodityList('local');
	const fcl_customs = [
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
			label       : 'Location',
			name        : 'location_id',
			span        : 2,
			placeholder : 'Select Location',
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			asyncKey    : 'list_locations',
			disabled    : type === 'edit',
			watch       : true,

			params: { filters: { type: ['continent', 'country', 'seaport'] } },
		},
		{
			label       : 'Container Size',
			name        : 'container_size',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Container Size',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : containerSize,

		},
		{
			label       : 'Container Type',
			name        : 'container_type',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Container Type',
			caret       : true,
			disabled    : type === 'edit',
			watch       : true,
			options     : containertypes,

		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			span        : 2,
			type        : 'select',
			caret       : true,
			disabled    : type === 'edit',
			placeholder : 'Select Commodity',
			watch       : true,
			options     : freightOptions,
		},
	];
	const air_customs = [
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
			label       : 'Location',
			name        : 'location_id',
			span        : 2,
			placeholder : 'Select Location',
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'country', 'airport'] } },
		},
		{
			label         : 'Commodity',
			name          : 'commodity',
			span          : 2,
			type          : 'select',
			placeholder   : 'Select Commodity',
			watch         : true,
			caret         : true,
			disabled      : type === 'edit',
			commodityType : 'air_customs',
		},
	];
	const haulage_freight = [
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
				{ label: 'Domestic', value: 'domestic' },
			],
		},
		{
			label       : 'Origin Location',
			name        : 'origin_location_id',
			span        : 2,
			placeholder : 'Select Origin',
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			disabled    : type === 'edit',
			params      : {
				filters: { type: ['continent', 'country', 'seaport', 'city'] },
			},
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			span        : 2,
			placeholder : 'Select Destination',
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			watch       : true,
			asyncKey    : 'list_locations',
			disabled    : type === 'edit',
			params      : {
				filters: { type: ['continent', 'country', 'seaport', 'city'] },
			},
		},
		{
			name        : 'haulage_type',
			span        : 2,
			label       : 'Haulage Provider',
			type        : 'select',
			placeholder : 'Select Haulage Provider',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : [
				{ label: 'Carrier', value: 'carrier' },
				{ label: 'Merchant', value: 'merchant' },
			],
		},
		{
			name        : 'shipping_line_id',
			span        : 2,
			label       : 'Shipping line',
			type        : 'async_select',
			initialCall : true,
			caret       : true,
			watch       : true,
			asyncKey    : 'list_operators',

			disabled    : type === 'edit',
			placeholder : 'Select Shipping Line',

		},
		{
			label       : 'Transportation mode',
			name        : 'transport_mode',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Transportation Mode',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : [
				{ label: 'Rail', value: 'rail' },
				{ label: 'Barge', value: 'barge' },
				{ label: 'Trailer', value: 'trailer' },
				{ label: 'Multimode/Any mode', value: 'multimode' },
			],
		},
		{
			label       : 'Container Size',
			name        : 'container_size',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Container Size',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : containerSize,

		},
		{
			label       : 'Container Type',
			name        : 'container_type',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Container Type',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : containertypes,
		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			span        : 2,
			type        : 'select',
			placeholder : 'Select Commodity',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : localOptions,
		},
	];
	return { fcl_customs, air_customs, haulage_freight };
}
