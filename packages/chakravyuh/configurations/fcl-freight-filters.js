import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { PARENT_RATE_MODE_OPTIONS, MODE_OPTIONS, PARENT_MODE_OPTIONS } from '../constants/air_commodities_mapping';
import { RATE_TYPES_OPTIONS } from '../constants/dashboard_filter_controls';

const controls = [
	{
		name    : 'rate_type',
		options : RATE_TYPES_OPTIONS,
		type    : 'select',
		span    : 12,
		label   : 'Rate Type',
		size    : 'md',
	},
	{
		name      : 'parent_rate_mode',
		type      : 'pills',
		label     : 'Parent Rate Source',
		options   : PARENT_RATE_MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name      : 'parent_mode',
		type      : 'pills',
		label     : 'Group rate source',
		options   : PARENT_MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name      : 'mode',
		type      : 'select',
		label     : 'Rate Source',
		options   : MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name      : 'container_size',
		type      : 'pills',
		label     : 'Container size',
		options   : containerSize,
		span      : 12,
		value     : '20',
		className : 'filter-row-flex md',
	},
	{
		name     : 'shipping_line_id',
		label    : 'Shipping Line',
		type     : 'async-select',
		asyncKey : 'list_operators',
		params   : {
			filters: {
				operator_type: 'shipping_line',
			},
		},
		multiple    : false,
		initialCall : false,
		span        : 12,
		className   : 'shipping-line-select',
		placeholder : 'Type here...',
		prefix      : null,
		size        : 'md',
	},
	{
		name      : 'container_type',
		type      : 'select',
		label     : 'Container Type',
		options   : containerTypes,
		span      : 12,
		value     : 'standard',
		className : 'filter-row-flex md',
	},

	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi-select',
		span        : 12,
		value       : ['general'],
		className   : 'filter-row-flex md',
		placeholder : 'Type here...',
		size        : 'md',
	},

];

export default controls;
