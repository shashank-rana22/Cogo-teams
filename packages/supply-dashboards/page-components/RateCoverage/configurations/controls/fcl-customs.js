/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions } from '../helpers/constants';

const fclCustomsControls = ({
	data,
	originLocationOptions,
	CommodityOptions,
	source,
}) => {
	const controls = [
		{
			name    : 'service_provicer_details',
			heading : 'Service Provider Details',
			span    : 12,
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
			label       : 'Rate Provided by user',
			type        : 'select',
			placeholder : 'Rate Provided by user',
			value       : data?.sourced_by_id,
			span        : 4,
			rules       : { required: 'rate provided by user is required' },
		},

		{
			name         : 'location_details',
			heading      : 'Location Details',
			span         : 12,
			showOptional : false,
		},

		{
			name        : 'origin_location_id',
			label       : 'Location',
			type        : 'select',
			placeholder : 'Origin Location',
			span        : 4,
			value       : data?.location?.id,
			disabled    : data?.location?.id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			label       : 'Trade Type',
			name        : 'trade_type',
			placeholder : 'Select Trade Type',
			value       : data?.trade_type,
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
			span        : 3,
			value       : data?.container_size || '20',
			disabled    : data?.container_size,
			options     : containerSizes,
			rules       : { required: 'container size is required' },
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			type        : 'select',
			span        : 4,
			value       : data?.container_type || 'standard',
			className   : 'primary lg',
			placeholder : 'Container Type',
			rules       : { required: 'This is required' },
			options     : containerTypes,
		},
		{
			name        : 'commodity',
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 3,
			value       : 'general',
			options     : CommodityOptions,
			rules       : { required: 'commodity is required' },
		},
		{
			name        : 'rate_type',
			type        : 'select',
			label       : 'Rate Type',
			span        : 3,
			placeholder : 'Rate Type',
			options     : [
				{
					label : 'Market place',
					value : 'market_place',
				},
				{
					label : 'Promotional',
					value : 'promotional',
				},
			],
			rules: {
				required: 'rate type is required',
			},
		},
		source === 'live_booking'
			? {
				name  : 'is_shipper_specific',
				label : 'Shipper Specific Rate',
				type  : 'checkbox',
				span  : 4,
			}
			: null,
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
				code         : '',
				unit         : '',
				currency     : '',
				price        : '',
				market_price : '',
				remarks      : '',
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
					placeholder : 'Currency',
					className   : 'primary lg',
					span        : 2,
					rules       : { required: 'This is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 2,
					className   : 'primary lg',
					placeholder : 'Enter amount',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					type        : 'select',
					className   : 'primary lg',
					span        : 2,
					rules       : { required: 'This is required' },
				},
				{
					name        : 'remarks',
					placeholder : 'Remarks',
					className   : 'primary lg',
					type        : 'text',
					span        : 3,
				},
			],
		},
		{
			name         : 'cfs_items',
			heading      : 'CFS Items',
			span         : 12,
			showOptional : false,
		},
		{
			label              : 'Add CFS Line Items',
			name               : 'fcl_customs_cfs_line_items',
			// name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Custom CFS Items',
			noDeleteButtonTill : 0,
			controls           : [
				// {
				// 	name        : 'cfs_line_items',
				// 	valueKey    : 'code',
				// 	type        : 'async_select',
				// 	span        : 2,
				// 	asyncKey    : 'list_rate_charge_codes',
				// 	params      : { service_name: 'fcl_cfs_charges' },
				// 	initialCall : true,
				// 	rules       : { required: 'Code is required' },
				// },
				{
					name        : 'cfs_line_items',
					type        : 'select',
					span        : 2,
					placeholder : 'Charge Name',
					rules       : { required: 'is required' },
				},
				{
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					placeholder : 'Currency',
					className   : 'primary lg',
					span        : 2,
					rules       : { required: 'This is required' },
				},
				{
					name        : 'price',
					span        : 2,
					type        : 'number',
					placeholder : 'Enter amount',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					type        : 'select',
					span        : 2,
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'remarks',
					placeholder : 'Remarks',
					type        : 'text',
					className   : 'primary lg',
					span        : 3,
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};

export default fclCustomsControls;
