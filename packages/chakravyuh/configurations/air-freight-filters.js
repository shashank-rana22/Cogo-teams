import { IcMCalendar } from '@cogoport/icons-react';

import { AIR_COMMODITIES, MODE_OPTIONS } from '../constants/air_commodities_mapping';

const controls = [
	{
		name      : 'mode',
		type      : 'pills',
		label     : 'Rate Source',
		options   : MODE_OPTIONS,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name    : 'weight_slab_in_kg',
		type    : 'pills',
		label   : 'Weight Slab in Kg',
		options : [
			{
				value : '0_45',
				label : '0-45',
			},
			{
				value : '45_100',
				label : '45-100',
			},
			{
				value : '100_300',
				label : '100-300',
			},
			{
				value : '300_500',
				label : '300-500',
			},
			{
				value : '500_1000',
				label : '500-1000',
			},
			{
				value : '1000_plus',
				label : '1000+',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name      : 'commodity_type',
		type      : 'pills',
		label     : 'Commodity Type',
		options   : AIR_COMMODITIES,
		span      : 12,
		className : 'filter-row-flex md',
	},
	{
		name     : 'airline',
		label    : 'Airline',
		type     : 'async-select',
		asyncKey : 'list_operators',
		params   : {
			filters: {
				operator_type: 'airline',
			},
		},
		multiple    : false,
		initialCall : false,
		span        : 6.2,
		className   : 'shipping-line-select',
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
		placeholder    : 'DD/MM/YYYY',
		showTimeSelect : false,
		prefix         : <IcMCalendar />,
	},
];

export default controls;
