import {
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	COMMODITY_NAME_MAPPING,
} from '@cogoport/globalization/constants/commodities';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCalendar, IcMSearchlight } from '@cogoport/icons-react';

import styles from '../page-components/AccuracyDashboard/Filters/FilterContainer/styles.module.css';

import { AIR_COMMODITIES_MAPPING } from './air_commodities_mapping';

const AIR_CONTROLS = [
	{
		name    : 'rate_source',
		type    : 'pills',
		label   : 'Rate Source',
		options : [
			{
				key   : 'supply_rate',
				value : 'supply_rate',
				label : 'Supply Rate',
			},
			{
				key   : 'predicted_rate',
				value : 'predicted_rate',
				label : 'Predicted Rate',
			},
			{
				key   : 'supply_predicted_rate',
				value : 'supply_predicted_rate',
				label : 'Supply Predicted Rate',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name    : 'weight_slab_in_kg',
		type    : 'pills',
		label   : 'Weight Slab in Kg',
		options : [
			{
				key   : '0_45',
				value : '0_45',
				label : '0-45',
			},
			{
				key   : '45_100',
				value : '45_100',
				label : '45-100',
			},
			{
				key   : '100_300',
				value : '100_300',
				label : '100-300',
			},
			{
				key   : '300_500',
				value : '300_500',
				label : '300-500',
			},
			{
				key   : '500_1000',
				value : '500_1000',
				label : '500-1000',
			},
			{
				key   : '1000_plus',
				value : '1000_plus',
				label : '1000+',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name    : 'commodity_type',
		type    : 'pills',
		label   : 'Commodity Type',
		options : AIR_COMMODITIES_MAPPING.map(({ value, label }) => ({
			key: value,
			value,
			label,
		})),
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
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
		rules       : { required: true },
		placeholder : 'Type here...',
		prefix      : null,
		size        : 'sm',
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
		prefix         : <IcMCalendar className={styles.search_icon} />,
	},
];

const SEA_CONTROLS = (commodityType) => ([
	{
		name    : 'rate_source',
		type    : 'pills',
		label   : 'Rate Source',
		options : [
			{
				key   : 'supply_rate',
				value : 'supply_rate',
				label : 'Supply Rate',
			},
			{
				key   : 'predicted_rate',
				value : 'predicted_rate',
				label : 'Predicted Rate',
			},
			{
				key   : 'supply_predicted_rate',
				value : 'supply_predicted_rate',
				label : 'Supply Predicted Rate',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name    : 'container_size',
		type    : 'pills',
		label   : 'Container Size',
		options : [
			{
				key   : '20ft',
				value : '20ft',
				label : '20ft',
			},
			{
				key   : '40ft',
				value : '40ft',
				label : '40ft',
			},
			{
				key   : '40ft_hc',
				value : '40ft_hc',
				label : '40ft HC',
			},
			{
				key   : '45ft_hc',
				value : '45ft_hc',
				label : '45ft HC',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name    : 'container_type',
		type    : 'pills',
		label   : 'Container Type',
		options : [
			{
				key   : 'standard',
				value : 'standard',
				label : 'Standard (Dry)',
			},
			{
				key   : 'refer',
				value : 'refer',
				label : 'Refrigirated',
			},
			{
				key   : 'open_top',
				value : 'open_top',
				label : 'Open Top',
			},
			{
				key   : 'open_side',
				value : 'open_side',
				label : 'Open Side',
			},
			{
				key   : 'flat_rack',
				value : 'flat_rack',
				label : 'Flat Rack',
			},
			{
				key   : 'iso_tank',
				value : 'iso_tank',
				label : 'ISO Tank',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name    : 'commodity_type',
		label   : 'Commodity Type',
		type    : 'multi-select',
		options : FREIGHT_CONTAINER_COMMODITY_MAPPINGS[commodityType]?.map(
			(item) => ({
				label : COMMODITY_NAME_MAPPING[item].name,
				value : item,
			}),
		) || [],
		span        : 12,
		className   : 'filter-row-flex md',
		rules       : { required: true },
		placeholder : 'Type here...',
		prefix      : <IcMSearchlight className={styles.search_icon} />,
		size        : 'sm',
		disabled    : commodityType?.length === GLOBAL_CONSTANTS.zeroth_index,
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
		size        : 'sm',
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
		prefix         : <IcMCalendar className={styles.search_icon} />,
	},
]);

export const usePopupFilterControls = (class_type, commodityType) => {
	if (class_type === 'fcl') {
		return SEA_CONTROLS(commodityType);
	}
	return AIR_CONTROLS;
};
