import containerSize from '@cogoport/constants/rail-container-sizes.json';
import containerTypes from '@cogoport/constants/rail-container-types.json';

import COMMODITY_TYPES from '../../../../configs/COMMODITY_TYPE.json';
import FREE_DAYS_TYPES from '../../../../configs/FREE_DAYS_TYPE.json';
import SPECIFICITY_TYPES from '../../../../configs/SPECIFICITY_TYPE.json';

const controls = [
	{
		name        : 'location_id',
		size        : 'sm',
		span        : 12,
		asyncKey    : 'list_locations',
		type        : 'async_select',
		label       : 'Location Terminal',
		isClearable : true,
		placeholder : 'Search via Name',
		params      : {
			filters: {
				type: ['railway_terminal'],
			},
		},
	},
	{
		name        : 'container_size',
		label       : 'Container Size',
		type        : 'select',
		size        : 'sm',
		span        : 12,
		placeholder : 'Search Container Size',
		options     : containerSize,
		isClearable : true,
	},
	{
		name        : 'container_type',
		label       : 'Container Type',
		type        : 'select',
		size        : 'sm',
		span        : 12,
		placeholder : 'Search Container Type',
		options     : containerTypes,
		isClearable : true,
	},
	{
		name        : 'free_days_type',
		label       : 'Free Days Type',
		size        : 'sm',
		type        : 'select',
		span        : 12,
		placeholder : 'Choose Free Days Type',
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
		options     : SPECIFICITY_TYPES.rail,
		isClearable : true,
	},
	{
		name        : 'commodity',
		label       : 'Commodity Type',
		type        : 'select',
		span        : 12,
		size        : 'sm',
		placeholder : 'Commodity',
		options     : COMMODITY_TYPES.rail,
		isClearable : true,
	},

];

export default controls;
