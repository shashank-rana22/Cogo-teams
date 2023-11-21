/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions } from '../helpers/constants';

const CARGO_HANDLING_OPTIONS = [
	{ label: 'Dock Stuffing', value: 'stuffing_at_dock', type: 'origin' },
	{
		label : 'Dock Destuffing',
		value : 'destuffing_at_dock',
		type  : 'destination',
	},
	{
		label : 'Factory Stuffing',
		value : 'stuffing_at_factory',
		type  : 'origin',
	},
	{
		label : 'DPD without cfs',
		value : 'dpd_without_cfs',
		type  : 'destination',
	},
	{
		label : 'DPD cfs dock destuffing',
		value : 'dpd_cfs_dock_destuffing',
		type  : 'destination',
	},
	{
		label : 'DPD cfs factory destuffing',
		value : 'dpd_cfs_factory_destuffing',
		type  : 'destination',
	},
	{
		label : 'Enpanelled cfs dock destuffing',
		value : 'enpanelled_cfs_dock_destuffing',
		type  : 'destination',
	},
	{
		label : 'Enpanelled cfs factory destuffing',
		value : 'enpanelled_cfs_factory_destuffing',
		type  : 'destination',
	},
	{
		label : 'Non-enpanelled cfs dock destuffing',
		value : 'non_enpanelled_cfs_dock_destuffing',
		type  : 'destination',
	},
	{
		label : 'Non-enpanelled cfs factory destuffing',
		value : 'non_enpanelled_cfs_factory_destuffing',
		type  : 'destination',
	},
];

const cfsControls = ({ data, originLocationOptions, source }) => {
	const controls = [
		{
			heading      : 'Service Provider Details',
			span         : 12,
			showOptional : false,
		},
		{
			name        : 'service_provider_id',
			label       : 'Service Provider',
			type        : 'select',
			placeholder : 'Service Provider',
			span        : 4,
			value       : data?.service_provider_id,
			rules       : { required: 'service provider is required' },
		},
		{
			name        : 'sourced_by_id',
			label       : 'Rate Provided By LSP User',
			placeholder : 'Rate Provided By LSP User',
			type        : 'select',
			span        : 4,
			rules       : { required: 'sourced by is required' },
		},
		{
			name         : 'location_details',
			heading      : 'Location Details',
			span         : 12,
			showOptional : false,
		},
		{
			name        : 'origin_location_id',
			label       : 'Origin Location',
			type        : 'select',
			placeholder : 'Origin Location',
			span        : 4,
			value       : data?.location_id,
			disabled  	 : data?.location_id,
			...originLocationOptions,
		},
		{
			label       : 'Trade Type',
			name        : 'trade_type',
			placeholder : 'Select Trade Type',
			value       : data?.trade_type,
			disabled    : data?.trade_type,
			options     : [
				{
					label : 'Export',
					value : 'export',
				},
				{
					label : 'Import',
					value : 'import',
				},
			],
			type      : 'select',
			span      : 4,
			className : 'primary lg',
			caret     : true,
			rules     : { required: 'This is required' },
		},
		{
			name         : 'container_details',
			heading      : 'Container Details',
			span         : 12,
			showOptional : false,
		},
		{
			name        : 'container_size',
			label       : 'Container Size',
			type        : 'select',
			placeholder : 'Container Size',
			span        : 4,
			value       : data?.container_size || '20',
			disabled    : data?.container_size,
			options     : containerSizes,
			rules       : { required: 'container size is required' },
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			type        : 'select',
			placeholder : 'Container Type',
			span        : 4,
			value       : data?.container_type || 'standard',
			disabled    : data?.container_type,
			options     : containerTypes,
			rules       : { required: 'container type is required' },
		},
		{
			name        : 'commodity',
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 3,
			value       : data?.commodity,
			disabled    : data?.commodity,
			rules       : { required: 'commodity is required' },
		},
		{
			heading      : 'Other Details',
			span         : 12,
			showOptional : false,
		},
		{
			label       : 'Cargo Handling',
			name        : 'cargo_handling_type',
			placeholder : 'Select',
			className   : 'primary lg',
			span        : 4,
			type        : 'select',
			value       : data?.cargo_handling_type,
			disabled    : data?.cargo_handling_type,
			options     : CARGO_HANDLING_OPTIONS,
			rules       : { required: 'This is required' },
		},
		{
			label       : 'Free Days Type',
			name        : 'free_days_type',
			type        : 'select',
			span        : 4,
			placeholder : 'Select Free Days Type',
			className   : 'primary lg',
			options     : [
				{
					value : 'ground_rent',
					label : 'Ground Rent Free Days',
				},
				{
					value : 'refer_plugin',
					label : 'Refer Plugin Free Days',
				},
			],
			rules: { required: 'This is required' },
		},
		{
			label        : 'Free Limit Days',
			name         : 'free_limit_days',
			type         : 'number',
			span         : 4,
			className    : 'primary lg',
			showOptional : false,
			placeholder  : 'Free Limit Days',
			rules        : { required: 'This is required' },
		},
		['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
			? {
				name  : 'is_shipper_specific',
				label : 'Shipper Specific Rate',
				type  : 'checkbox',
				span  : 4,
			}
			: null,
		{
			heading      : 'Add Slabs',
			name         : 'add_slabss',
			showOptional : false,
			span         : 12,
		},
		{
			name               : 'add_slabs',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Slabs',
			noDeleteButtonTill : 0,
			controls           : [
				{
					name         : 'lower_limit',
					type         : 'number',
					span         : 2,
					showOptional : false,
					placeholder  : 'Lower Limit',
					className    : 'primary lg',
					rules        : { required: 'This is required' },
				},
				{
					name         : 'upper_limit',
					type         : 'number',
					span         : 2,
					showOptional : false,
					className    : 'primary lg',
					placeholder  : 'Upper Limit',
					rules        : { required: 'This is required' },
				},
				{
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					span        : 2,
					placeholder : 'Curr...',
					rules       : { required: 'currency is required' },
				},
				{
					name         : 'price',
					type         : 'number',
					span         : 2,
					showOptional : false,
					className    : 'primary lg',
					placeholder  : 'Price',
					rules        : { required: 'This is required' },
				},
			],
		},
		{
			heading      : 'Line Items',
			showOptional : false,
			span         : 12,
		},
		{
			label              : 'Add Custom Line Items',
			name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Custom Line Items',
			noDeleteButtonTill : 1,
			value              : [{
				code     : '',
				unit     : '',
				currency : '',
				price    : '',
				remarks  : '',
			}],
			controls: [
				{
					name        : 'code',
					type        : 'select',
					span        : 2,
					placeholder : 'Charge Name',
					rules       : { required: 'is required' },
				},
				{
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					span        : 2,
					placeholder : 'Curr...',
					rules       : { required: 'currency is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 2,
					placeholder : 'Enter amount',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					type        : 'select',
					span        : 2,
					rules       : { required: 'This is required' },
				},
			],
		},

	];
	return controls.filter((control) => control !== null);
};

export default cfsControls;
