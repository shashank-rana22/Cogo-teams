/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions } from '../helpers/constants';

const haulageControls = ({
	data,
	CommodityOptions,
	originLocationOptions,
	destinationLocationOptions,
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
			heading : 'Location Details',
			name    : 'location_details',
			span    : 12,
		},
		{
			name        : 'origin_location_id',
			label       : 'Origin Location',
			type        : 'select',
			placeholder : 'Origin Location',
			span        : 4,
			value       : data?.origin_location_id,
			disabled 	  : data?.origin_location_id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			name        : 'destination_location_id',
			type        : 'select',
			label       : 'Destination Location',
			span        : 4,
			value       : data?.destination_location_id,
			disabled    : data?.destination_location_id,
			...destinationLocationOptions,
			placeholder : 'Destination Location',
			rules       : { required: 'destination location is required' },
		},
		{
			heading : 'Container Details',
			name    : 'container_details',
			span    : 12,
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			type        : 'select',
			placeholder : 'Container Type',
			span        : 3,
			value       : data?.container_type || 'standard',
			disabled    : data?.container_type,
			options     : containerTypes,
			rules       : { required: 'container type is required' },
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
			name        : 'commodity',
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 3,
			value       : data?.commodity,
			options     : CommodityOptions,
			rules       : { required: 'commodity is required' },
		},
		{
			heading : 'Other Details',
			name    : 'other_details',
			span    : 12,
		},
		{
			name        : 'haulage_type',
			type        : 'select',
			placeholder : 'Haulage Provider',
			span        : 3,
			options     : [
				{ label: 'Carrier', value: 'carrier' },
				{ label: 'Merchant', value: 'merchant' },
			],
			rules: { required: 'This is required' },
		},
		{
			name        : 'transport_modes',
			placeholder : 'Transportation Modes',
			multiple    : true,
			type        : 'multiSelect',
			span        : 3,
			options     : [
				{ label: 'Rail', value: 'rail' },
				{ label: 'Barge', value: 'barge' },
			],
			rules: { required: 'This is required' },
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
			name    : 'weight_slabs',
			heading : 'Weight Slabs',
			type    : 'fieldArray',
			value   : [{
				lower_limit : '',
				upper_limit : '',
				currency    : '',
				price       : '',
			}],
			buttonText : 'Add Weight Slabs',
			controls   : [
				{
					name        : 'lower_limit',
					type        : 'number',
					span        : 4,
					placeholder : 'Lower Limit (in MT)',
				},
				{
					name        : 'upper_limit',
					type        : 'number',
					span        : 4,
					placeholder : 'Upper Limit (in MT)',
				},
				{
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					span        : 1.5,
					placeholder : 'Curr...',
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 1.5,
					placeholder : 'Price',
				},
			],
		},
		{
			type               : 'fieldArray',
			heading            : 'Line Items',
			name               : 'line_items',
			buttonText         : 'Add Line Items',
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
					span        : 2,
					placeholder : 'Currency',
					rules       : { required: 'currency is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 1.5,
					placeholder : 'Enter amount',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'market_price',
					span        : 1.5,
					type        : 'number',
					placeholder : 'Market Price',
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					type        : 'select',
					span        : 2,
					rules       : { required: 'This is required' },
				},
				{
					name        : 'remarks',
					placeholder : 'Remarks',
					type        : 'text',
					span        : 2,
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default haulageControls;
