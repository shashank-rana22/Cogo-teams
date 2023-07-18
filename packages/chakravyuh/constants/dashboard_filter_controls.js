import { IcMCalendar, IcMSearchlight } from '@cogoport/icons-react';

import styles from '../page-components/AccuracyDashboard/Filters/FilterContainer/styles.module.css';

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
		name    : 'comomodity_type',
		type    : 'pills',
		label   : 'Comomodity Type',
		options : [
			{
				key   : 'general_cargo',
				value : 'general_cargo',
				label : 'General Cargo',
			},
			{
				key   : 'dangerous_cargo',
				value : 'dangerous_cargo',
				label : 'Dangerous Cargo',
			},
			{
				key   : 'pharma',
				value : 'pharma',
				label : 'Pharma',
			},
			{
				key   : 'others',
				value : 'others',
				label : 'Others',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name        : 'Shipping Line',
		label       : 'Shipping Line',
		type        : 'async-select',
		asyncKey    : 'shipping_lines',
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

const SEA_CONTROLS = [
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
				key   : 'standard_dry',
				value : 'standard_dry',
				label : 'Standard (Dry)',
			},
			{
				key   : 'open_top',
				value : 'open_top',
				label : 'Open Top',
			},
			{
				key   : 'flat_rack',
				value : 'flat_rack',
				label : 'Flat Rack',
			},
		],
		span      : 12,
		className : 'filter-row-flex md',
		rules     : { required: true },
	},
	{
		name        : 'commodity_type',
		label       : 'Commodity Type',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		multiple    : true,
		initialCall : false,
		span        : 12,
		className   : 'filter-row-flex md',
		rules       : { required: true },
		placeholder : 'Type here...',
		prefix      : <IcMSearchlight className={styles.search_icon} />,
		size        : 'sm',
	},
	{
		name        : 'Shipping Line',
		label       : 'Shipping Line',
		type        : 'async-select',
		asyncKey    : 'shipping_lines',
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

export const useDasboardFilters = (class_type) => {
	if (class_type === 'sea') {
		return SEA_CONTROLS;
	}
	return AIR_CONTROLS;
};
