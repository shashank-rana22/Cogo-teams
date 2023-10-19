import CONTAINER_SIZE from '@cogoport/constants/container-sizes.json';
import CONTAINER_TYPE from '@cogoport/constants/container-types.json';
import { startCase } from '@cogoport/utils';

import HAULAGE_FREIGHT_COMMODITIES from './constant';

const getHaulageFreightControl = () => [
	{
		name        : 'service_provider_id',
		type        : 'async_select',
		label       : 'Service Provider',
		asyncKey    : 'organizations',
		placeholder : 'Select Service Provider',
		isClearable : true,
		span        : 12,
		params      : {
			filters: {
				kyc_status   : 'verified',
				account_type : 'service_provider',
				status       : 'active',
			},
		},
	},
	{
		name        : 'origin_location_id',
		label       : 'Origin Location',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		isClearable : true,
		params      : { filters: { type: ['seaport', 'pincode', 'city', 'country'] } },
		multiple    : false,
		span        : 12,
	},
	{
		name        : 'destination_location_id',
		label       : 'Destination Location',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['seaport', 'pincode', 'city', 'country'] } },
		multiple    : false,
		isClearable : true,
		span        : 12,
	},
	{
		name        : 'container_size',
		label       : 'Container Size',
		type        : 'select',
		multiple    : false,
		isClearable : true,
		span        : 12,
		options     : CONTAINER_SIZE,
	},
	{
		name        : 'container_type',
		label       : 'Container Type',
		type        : 'select',
		multiple    : false,
		isClearable : true,
		span        : 12,
		options     : CONTAINER_TYPE,
	},
	{
		name          : 'commodity',
		label         : 'Commodity',
		type          : 'select',
		commodityType : 'local',
		multiple      : false,
		isClearable   : true,
		span          : 12,
		options       : HAULAGE_FREIGHT_COMMODITIES.map((commodity) => ({
			label : startCase(commodity),
			value : commodity,
		})),
	},
	{
		label   : 'Haulage Provider',
		name    : 'haulage_type',
		type    : 'multi_select',
		options : [
			{ label: 'Carrier', value: 'carrier' },
			{ label: 'Merchant', value: 'merchant' },
		],
		span: 12,
	},
	{
		name        : 'shipping_line_id',
		label       : 'Shipping Line',
		type        : 'async_select',
		asyncKey    : 'operators',
		isClearable : true,
		multiple    : false,
		span        : 12,
		params      : {
			filters: {
				operator_type : 'shipping_line',
				page_limit    : 100,
				sort_type     : 'asc',
				sort_by       : 'short_name',
			},
		},
	},
	{
		label   : 'Transportation Mode',
		name    : 'transport_modes',
		type    : 'multi_select',
		caret   : true,
		options : [
			{ label: 'Rail', value: 'rail' },
			{ label: 'Barge', value: 'barge' },
			{ label: 'Trailer', value: 'trailer' },
		],
		span: 12,
	},
	{
		name        : 'is_weight_slabs_missing',
		label       : 'Weight Slabs Missing ?',
		type        : 'select',
		caret       : true,
		options     : [{ value: true, label: 'Yes' }],
		multiple    : false,
		isClearable : true,
		span        : 12,
	},
];

export default getHaulageFreightControl;
