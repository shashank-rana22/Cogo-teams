import containerSize from '@cogoport/constants/container-sizes.json';
import containertypes from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

export default function getFclControls({ type = '' }) {
	const lclFreightOptions = getCommodityList('lcl_freight');
	const freightOptions = getCommodityList('freight');

	const fcl_freight = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
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
			placeholder : 'Select Origin',
			type        : 'async_select',
			asyncKey    : 'list_locations',
			caret       : true,
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			placeholder : 'Select Destination',
			type        : 'async_select',
			caret       : true,

			asyncKey : 'list_locations',
			watch    : true,
			span     : 6,
			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			name           : 'shipping_line_id',
			label          : 'Shipping line',
			type           : 'async_select',
			caret          : true,
			defaultOptions : true,
			watch          : true,

			disabled    : type === 'edit',
			asyncKey    : 'list_operators',
			placeholder : 'Select Shipping Line',

		},
		{
			label       : 'Container Size',
			name        : 'container_size',
			type        : 'select',
			caret       : true,
			placeholder : 'Select Container Size',
			watch       : true,
			span        : 6,
			disabled    : type === 'edit',
			options     : containerSize,

		},
		{
			label       : 'Container Type',
			name        : 'container_type',
			type        : 'select',
			caret       : true,
			placeholder : 'Select Container Type',
			watch       : true,
			span        : 6,
			disabled    : type === 'edit',
			options     : containertypes,

		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			type        : 'select',
			caret       : true,
			placeholder : 'Select Commodity',
			watch       : true,
			span        : 6,
			disabled    : type === 'edit',
			options     : freightOptions,

		},
	];
	const lcl_freight = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
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
			placeholder : 'Select Origin',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			placeholder : 'Select Destination',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'seaport', 'country'] } },
		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			type        : 'select',
			placeholder : 'Select Commodity',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : lclFreightOptions,

		},
	];
	const air_freight = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
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
			placeholder : 'Select Origin',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'country', 'airport'] } },
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			placeholder : 'Select Destination',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : { filters: { type: ['continent', 'country', 'airport'] } },
		},
		{
			name     : 'airline_id',
			label    : 'Airline',
			type     : 'async_select',
			caret    : true,
			asyncKey : 'list_operators',
			watch    : true,

			disabled    : type === 'edit',
			placeholder : 'Select Airline',

		},
		{
			label         : 'Commodity',
			name          : 'commodity',
			type          : 'select',
			placeholder   : 'Select Commodity',
			caret         : true,
			watch         : true,
			disabled      : type === 'edit',
			commodityType : 'air_freight',
		},
	];
	const lcl_customs = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
			disabled : type === 'edit',
			watch    : true,
			options  : [
				{ label: 'Import', value: 'import' },
				{ label: 'Export', value: 'export' },
			],
		},
		{
			label       : 'Location',
			name        : 'location_id',
			placeholder : 'Select Location',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			disabled    : type === 'edit',

			params: { filters: { type: ['continent', 'country', 'seaport'] } },
		},
		{
			label       : 'Commodity',
			name        : 'commodity',
			type        : 'select',
			placeholder : 'Select Commodity',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : lclFreightOptions,
		},
	];

	return { fcl_freight, lcl_freight, air_freight, lcl_customs };
}
