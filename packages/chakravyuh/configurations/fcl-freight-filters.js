import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { MODE_OPTIONS } from '../constants/air_commodities_mapping';

const controls = [
	{
		name      : 'mode',
		type      : 'pills',
		label     : 'Rate Source',
		options   : MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name      : 'container_size',
		type      : 'pills',
		label     : 'Container Size',
		options   : containerSize,
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name      : 'container_type',
		type      : 'pills',
		label     : 'Container Type',
		options   : containerTypes,
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name        : 'commodity',
		label       : 'Commodity',
		type        : 'multi-select',
		span        : 12,
		className   : 'filter-row-flex md',
		rules       : { required: true },
		placeholder : 'Type here...',
		size        : 'md',
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
		span        : 6.2,
		className   : 'shipping-line-select',
		rules       : { required: true },
		placeholder : 'Type here...',
		prefix      : null,
		size        : 'md',
	},
	{
		name           : 'created_at',
		label          : 'Created At',
		type           : 'date_picker',
		span           : 5.8,
		className      : 'filter-row-flex md',
		rules          : { required: true },
		placeholder    : 'DD/MM/YYYY',
		showTimeSelect : false,
	},
];

export default controls;
