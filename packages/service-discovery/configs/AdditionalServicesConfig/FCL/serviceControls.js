import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMLocation } from '@cogoport/icons-react';

import CustomSelectOption from '../../../common/CustomSelectOption';

const currencyOptions = Object.keys(GLOBAL_CONSTANTS.currency_code).map((currency) => ({
	label : currency,
	value : currency,
}));

// 	{
// 		name    : 'stuffing_type',
// 		label   : 'Stuffing',
// 		type    : 'select',
// 		caret   : true,
// 		options : [
// 			{
// 				value : 'stuffing_at_factory',
// 				label : 'Factory Stuffing',
// 			},
// 			{
// 				value : 'stuffing_at_dock',
// 				label : 'Dock Stuffing',
// 			},
// 		],
// 		style : { width: 200 },
// 		rules : { required: 'This is required' },
// 	},
// 	{
// 		name        : 'origin_warehouse_id',
// 		type        : 'async-select',
// 		label       : 'Origin Warehouse',
// 		placeholder : 'select location',
// 		asyncKey    : 'list_locations',
// 		initialCall : false,
// 		span        : 6,
// 		params      : {
// 			page_limit      : 20,
// 			includes        : { default_params_required: true },
// 			filters         : { status: 'active', type: ['pincode', 'city'], country_id: [origin_country_id] },
// 			recommendations : true,

// 		},
// 		prefix      : <IcMLocation fontSize={16} />,
// 		isClearable : true,
// 		style       : { width: 250 },
// 		rules       : { required: 'Origin is required' },
// 		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,

// 	},
// 	{
// 		name    : 'destuffing_type',
// 		label   : 'De-Stuffing',
// 		type    : 'select',
// 		caret   : true,
// 		span    : 12,
// 		style   : { width: 300 },
// 		options : [
// 			{
// 				label : 'Direct Port Delivery',
// 				value : 'direct_port_delivery',
// 			},
// 			{
// 				label : 'Destuffing at Factory',
// 				value : 'delivery_from_dock',
// 			},
// 			{
// 				label : 'Destuffing at CFS',
// 				value : 'destuffing_at_dock',
// 			},
// 			{
// 				label : 'DPD Without CFS',
// 				value : 'dpd_without_cfs',
// 			},
// 			{
// 				label : 'DPD CFS Dock Destuffing',
// 				value : 'dpd_cfs_dock_destuffing',
// 			},
// 			{
// 				label : 'DPD CFS Factory Destuffing',
// 				value : 'dpd_cfs_factory_destuffing',
// 			},
// 			{
// 				label : 'Enapanelled CFS Dock Destuffing',
// 				value : 'enpanelled_cfs_dock_destuffing',
// 			},
// 			{
// 				label : 'Enapanelled CFS Factory Destuffing',
// 				value : 'enpanelled_cfs_factory_destuffing',
// 			},
// 			{
// 				label : ' Non-Enapanelled CFS Factory Destuffing',
// 				value : 'non_enpanelled_cfs_factory_destuffing',
// 			},
// 			{
// 				label : 'Non-Enapanelled CFS Dock Destuffing',
// 				value : 'non_enpanelled_cfs_dock_destuffing',
// 			},
// 		],
// 		rules: { required: 'This is required' },
// 	},
// 	{
// 		name        : 'destination_warehouse_id',
// 		type        : 'async-select',
// 		label       : 'Destination Warehouse',
// 		placeholder : 'select location',
// 		asyncKey    : 'list_locations',
// 		initialCall : false,
// 		span        : 6,
// 		params      : {
// 			page_limit      : 20,
// 			includes        : { default_params_required: true },
// 			filters         : { status: 'active', type: ['pincode', 'city'], country_id: [destination_country_id] },
// 			recommendations : true,

// 		},
// 		prefix      : <IcMLocation fontSize={16} />,
// 		isClearable : true,
// 		style       : { width: 250 },
// 		rules       : { required: 'Destination is required' },
// 		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
// 	},
// 	{
// 		name           : 'truck_type',
// 		label          : 'Truck Type',
// 		type           : 'select',
// 		caret          : true,
// 		optionsListKey : 'truck-types',
// 		span           : 8,
// 		style          : { width: 250 },
// 		condition      : {
// 			stuffing_type   : ['stuffing_at_dock'],
// 			destuffing_type : ['destuffing_at_dock'],
// 		},
// 		rules: { required: 'Required' },
// 	},
// 	{
// 		name        : 'trucks_count',
// 		label       : 'Trucks count',
// 		placeholder : 'Truck count',
// 		type        : 'number',
// 		span        : 4,
// 		condition   : {
// 			stuffing_type   : ['stuffing_at_dock'],
// 			destuffing_type : ['destuffing_at_dock'],

// 		},
// 		rules: { required: 'Required', min: 0 },
// 	},
// 	{
// 		name    : 'cargo_value_currency',
// 		label   : 'Cargo currency',
// 		options : currencyOptions,
// 		style   : { width: 100 },
// 		type    : 'select',
// 		rules   : { required: 'This is required' },
// 	},
// 	{
// 		name        : 'cargo_value',
// 		label       : 'Cargo value',
// 		placeholder : 'Cargo Value',
// 		type        : 'number',
// 		style       : { width: 200 },
// 		rules       : { required: 'This is required' },
// 	},
// ];

// eslint-disable-next-line max-lines-per-function
const controls = ({ destination_country_id, origin_country_id }) => [
	{
		name    : 'origin_cargo_handling_type',
		label   : 'Origin Cargo Stuffing',
		type    : 'select',
		caret   : true,
		options : [
			{
				value : 'stuffing_at_factory',
				label : 'Factory Stuffing',
			},
			{
				value : 'stuffing_at_dock',
				label : 'Dock Stuffing',
			},
		],
		style     : { width: 250 },
		condition : { services: ['export_fcl_customs', 'export_transportation', 'export_fcl_cfs'] },
		rules     : { required: 'Cargo Stuffing is required' },
	},
	{
		label       : 'Pickup Pincode',
		name        : 'origin_warehouse_id',
		placeholder : 'Search via pincode',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		caret       : true,
		grouped     : ['city'],
		params      : { filters: { status: 'active', type: ['pincode', 'city'], country_id: [origin_country_id] } },
		condition   : { services: ['export_transportation'] },
		rules       : { required: 'Pincode is required' },
		prefix      : <IcMLocation fontSize={16} />,
		style       : { width: 250 },
		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
	},
	{
		name           : 'truck_type',
		label          : 'Truck Type',
		type           : 'select',
		caret          : true,
		optionsListKey : 'truck-types',
		style          : { width: 200 },
		condition      : {
			origin_cargo_handling_type : ['stuffing_at_dock'],
			services                   : ['export_transportation'],
		},
		rules: { required: 'Truck Type is required' },
	},
	{
		name      : 'trucks_count',
		label     : 'Trucks count',
		type      : 'number',
		style     : { width: 200 },
		condition : {
			origin_cargo_handling_type : ['stuffing_at_dock'],
			services                   : ['export_transportation'],
		},
		rules: { required: 'Trucks count is required', min: 0 },
	},

	{
		name    : 'destination_cargo_handling_type',
		label   : 'Destination Cargo Handling',
		type    : 'select',
		caret   : true,
		options : [
			{
				label : 'Direct Port Delivery',
				value : 'direct_port_delivery',
			},
			{
				label : 'Destuffing at Factory',
				value : 'delivery_from_dock',
			},
			{
				label : 'Destuffing at CFS',
				value : 'destuffing_at_dock',
			},
			{
				label : 'DPD Without CFS',
				value : 'dpd_without_cfs',
			},
			{
				label : 'DPD CFS Dock Destuffing',
				value : 'dpd_cfs_dock_destuffing',
			},
			{
				label : 'DPD CFS Factory Destuffing',
				value : 'dpd_cfs_factory_destuffing',
			},
			{
				label : 'Empanelled CFS Dock Destuffing',
				value : 'enpanelled_cfs_dock_destuffing',
			},
			{
				label : 'Empanelled CFS Factory Destuffing',
				value : 'enpanelled_cfs_factory_destuffing',
			},
			{
				label : ' Non-Empanelled CFS Factory Destuffing',
				value : 'non_enpanelled_cfs_factory_destuffing',
			},
			{
				label : 'Non-Empanelled CFS Dock Destuffing',
				value : 'non_enpanelled_cfs_dock_destuffing',
			},
		],
		condition : { services: ['import_fcl_customs', 'import_transportation', 'import_fcl_cfs'] },
		rules     : { required: 'Cargo Handling is required' },
	},
	{
		label       : 'Destination Pincode',
		name        : 'destination_warehouse_id',
		placeholder : 'Search via pincode',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		caret       : true,
		style       : { width: 250 },
		grouped     : ['city'],
		params      : {
			filters: {
				status     : 'active',
				type       : ['pincode', 'city'],
				country_id : [destination_country_id],
			},
		},
		condition   : { services: ['import_transportation'] },
		rules       : { required: 'Pincode is required' },
		prefix      : <IcMLocation fontSize={16} />,
		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
	},
	{
		name      : 'cargo_value_currency',
		label     : 'Cargo currency',
		options   : currencyOptions,
		type      : 'select',
		style     : { width: 200 },
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'cargo_value',
		label     : 'Cargo value',
		type      : 'number',
		style     : { width: 200 },
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name           : 'truck_type',
		label          : 'Truck Type',
		type           : 'select',
		caret          : true,
		optionsListKey : 'truck-types',
		style          : { width: 200 },
		condition      : {
			destination_cargo_handling_type : ['destuffing_at_dock'],
			services                        : ['import_transportation'],
		},
		rules: { required: 'Truck Type is required' },
	},
	{
		name      : 'trucks_count',
		label     : 'Trucks count',
		type      : 'number',
		style     : { width: 200 },
		value     : 1,
		condition : {
			destination_cargo_handling_type : ['destuffing_at_dock'],
			services                        : ['import_transportation'],
		},
		rules: { required: 'Trucks count is required', min: 0 },
	},
	{
		name    : 'haulage_type',
		type    : 'pills',
		label   : 'Haulage type',
		options : [
			{
				label : 'Merchant',
				value : 'merchant',
			},
			{
				label : 'Carrier',
				value : 'carrier',
			},
		],
		style     : { width: 200 },
		condition : {
			services: ['export_haulage_freight', 'import_haulage_freight'],
		},
		rules: { required: 'Haulage Type is required' },
	},

];

export default controls;
