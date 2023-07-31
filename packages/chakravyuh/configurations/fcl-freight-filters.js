import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { MODE_OPTIONS } from '../constants/air_commodities_mapping';
import { SERVICE_TYPE_OPTIONS } from '../constants/dashboard_filter_controls';

const controls = [
	{
		name    : 'service_type',
		options : SERVICE_TYPE_OPTIONS,
		type    : 'select',
		span    : 12,
		size    : 'md',
		label   : 'Service Type',
	},
	{
		name      : 'mode',
		type      : 'pills',
		label     : 'Rate Source',
		options   : MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name      : 'container_size',
		type      : 'pills',
		label     : 'Container Size',
		options   : containerSize,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name     : 'shipping_line',
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
		type      : 'pills',
		label     : 'Container Type',
		options   : containerTypes,
		span      : 12,
		className : 'filter-row-flex md',
	},

	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi-select',
		span        : 12,
		className   : 'filter-row-flex md',
		placeholder : 'Type here...',
		size        : 'md',
	},

];

export default controls;
