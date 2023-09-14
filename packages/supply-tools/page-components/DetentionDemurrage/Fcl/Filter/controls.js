import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import FREE_DAYS_TYPES from '../../../../configs/FREE_DAYS_TYPE.json';
import LOCATION_TYPES from '../../../../configs/LOCATION_TYPE.json';
import SPECIFICITY_TYPES from '../../../../configs/SPECIFICITY_TYPE.json';
import TRADE_TYPES from '../../../../configs/TRADE_TYPE.json';

const controls = [
	{
		name        : 'location_type',
		label       : 'Location Type',
		type        : 'select',
		placeholder : 'Location Type',
		size        : 'sm',
		span        : 12,
		options     : LOCATION_TYPES.fcl,
		isClearable : true,
	},
	{
		label       : 'Location',
		name        : 'location_id',
		placeholder : 'Search via name',
		type        : 'async_select',
		size        : 'sm',
		span        : 12,
		asyncKey    : 'list_locations',
		isClearable : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit      : 20,
			includes        : { city: true, country: true, default_params_required: true },
			recommendations : true,
		},
	},
	{
		name        : 'shipping_line_id',
		label       : 'Shipping Line',
		placeholder : 'Search shipping line',
		type        : 'async_select',
		size        : 'sm',
		span        : 12,
		asyncKey    : 'list_operators',
		params      : {
			page_limit : 10,
			sort_by    : 'short_name',
			sort_type  : 'asc',
			filters    : { operator_type: 'shipping_line', status: 'active' },

		},
		isClearable: true,
	},
	{
		name        : 'container_size',
		label       : 'Container Size',
		type        : 'select',
		placeholder : 'Search container size',
		size        : 'sm',
		span        : 12,
		options     : containerSize,
		isClearable : true,
	},
	{
		name        : 'container_type',
		label       : 'Container Type',
		size        : 'sm',
		type        : 'select',
		options     : containerTypes,
		span        : 12,
		placeholder : 'Search container type',
		isClearable : true,
	},
	{
		name        : 'trade_type',
		type        : 'select',
		label       : 'Trade Type',
		size        : 'sm',
		span        : 12,
		options     : TRADE_TYPES.fcl,
		placeholder : 'Trade Type',
		isClearable : true,
	},
	{
		name        : 'free_days_type',
		label       : 'Free Days Type',
		size        : 'sm',
		type        : 'select',
		span        : 12,
		placeholder : 'Choose Free Days type',
		options     : FREE_DAYS_TYPES,
		isClearable : true,
	},
	{
		name        : 'specificity_type',
		label       : 'Specificity Type',
		type        : 'select',
		span        : 12,
		size        : 'sm',
		placeholder : 'Specificity Type',
		options     : SPECIFICITY_TYPES.fcl,
		isClearable : true,
	},
];

export default controls;
