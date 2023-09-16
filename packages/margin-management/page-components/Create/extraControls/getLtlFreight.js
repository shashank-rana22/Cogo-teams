import containerSize from '@cogoport/constants/container-sizes.json';
import containertypes from '@cogoport/constants/container-types.json';
import truckTypes from '@cogoport/constants/truck-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

export default function getLtlFreight({ type = '' }) {
	const freightOptions = getCommodityList('freight');
	const ltl_freight = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
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
			placeholder : 'Select Origin',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : {
				filters: {
					type: ['continent', 'country', 'pincode', 'seaport', 'airport'],
				},
			},
		},
		{
			label       : 'Destination Location',
			name        : 'destination_location_id',
			placeholder : 'Select Destination ',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : {
				filters: {
					type: ['continent', 'country', 'pincode', 'seaport', 'airport'],
				},
			},
		},
		{
			label         : 'Commodity',
			name          : 'commodity',
			type          : 'select',
			placeholder   : 'Select Commodity',
			caret         : true,
			watch         : true,
			disabled      : type === 'edit',
			commodityType : freightOptions,

		},
	];
	const ftl_freight = [
		{
			label    : 'Select Trade Type',
			name     : 'trade_type',
			type     : 'radio',
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
			placeholder : 'Select Origin',
			type        : 'async_select',
			caret       : true,
			asyncKey    : 'list_locations',
			watch       : true,
			span        : 6,

			disabled : type === 'edit',
			params   : {
				filters: {
					type: ['continent', 'country', 'pincode', 'seaport', 'airport'],
				},
			},
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
			params   : {
				filters: {
					type: ['continent', 'country', 'pincode', 'seaport', 'airport'],
				},
			},
		},
		{
			label       : 'Truck Type',
			name        : 'truck_type',
			placeholder : 'Select Truck Type',
			type        : 'select',
			caret       : true,
			watch       : true,
			disabled    : type === 'edit',
			options     : truckTypes,
		},
		{
			label         : 'Commodity',
			name          : 'commodity',
			type          : 'select',
			placeholder   : 'Select Commodity',
			caret         : true,
			watch         : true,
			disabled      : type === 'edit',
			commodityType : freightOptions,

		},
	];
	const fcl_freight_local = [
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
	return { fcl_freight_local, ftl_freight, ltl_freight };
}
