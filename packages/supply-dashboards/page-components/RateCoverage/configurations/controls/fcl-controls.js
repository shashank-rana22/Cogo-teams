/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions, rateTypeOptions } from '../helpers/constants';

const fclControls = ({
	data,
	listShippingLineOptions,
	CommodityOptions,
	originLocationOptions, destinationLocationOptions,
	source,
	serviceIdPresent,
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
			value       : serviceIdPresent || data?.service_provider_id,
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
			name        : 'shipping_line_id',
			label       : 'Shipping Line',
			type        : 'select',
			placeholder : 'Shipping Line',
			span        : 4,
			value       : data?.shipping_line_id,
			...listShippingLineOptions,
			rules       : { required: 'shipping line is required' },
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
			value       : data?.origin_port_id,
			disabled   	: data?.origin_port_id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			name        : 'origin_main_port_id',
			type        : 'select',
			label       : 'Origin Main port',
			placeholder : 'Origin Main port',
			span        : 4,
			rules       : { required: 'origin main port is required' },
		},
		{
			name        : 'destination_location_id',
			type        : 'select',
			label       : 'Destination Location',
			span        : 4,
			value       : data?.destination_port_id,
			disabled    : data?.destination_port_id,
			...destinationLocationOptions,
			placeholder : 'Destination Location',
			rules       : { required: 'destination location is required' },
		},
		{
			name        : 'destination_main_port_id',
			type        : 'select',
			label       : 'Destination main port',
			span        : 4,
			placeholder : 'Destination main port',
			rules       : { required: 'destination main port is required' },
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
			disabled    : data?.commodity,
			options     : CommodityOptions,
			rules       : { required: 'commodity is required' },
		},
		{
			name        : 'rate_type',
			type        : 'select',
			label       : 'Rate Type',
			span        : 3,
			placeholder : 'Rate Type',
			options     : rateTypeOptions,
			rules       : {
				required: 'rate type is required',
			},
		},
		{
			heading : 'Other Details',
			name    : 'other_details',
			span    : 12,
		},
		{
			name        : 'validity_start',
			label       : 'Validty Start',
			type        : 'date_picker',
			placeholder : 'Validity Start',
			span        : 4,
			rules       : {
				required: 'validity start date is required',
			},
		},
		{
			name        : 'validity_end',
			label       : 'Validity End',
			type        : 'date_picker',
			placeholder : 'Validity End',
			span        : 4,
			rules       : {
				required: 'validity end date is required',
			},
		},
		{
			name        : 'detention_free_days',
			label       : 'Detention Free Days',
			type        : 'number',
			placeholder : 'Detention Free Days',
			span        : 4,
			min         : 0,
			rules       : { required: 'detention free days is required' },
		},
		{
			name        : 'payment_term',
			label       : 'Payment Term',
			type        : 'select',
			placeholder : 'Payment Term',
			value       : 'prepaid',
			span        : 4,
			options     : [
				{ label: 'Collect', value: 'collect' },
				{ label: 'Prepaid', value: 'prepaid' },
			],
		},
		{
			name        : 'free_weight',
			label       : 'Free Weight Limit',
			type        : 'number',
			span        : 4,
			placeholder : 'Free Weight Limit',
			rules       : { required: 'free weight is required' },
		},
		{
			name        : 'schedule_type',
			label       : 'Shipment Type',
			type        : 'select',
			span        : 4,
			placeholder : 'Select Shipment Type',
			options     : [
				{ label: 'Direct', value: 'direct' },
				{
					label : 'Transhipment',
					value : 'transhipment',
				},
			],
			rules: { required: 'shipment type is required' },
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
			name               : 'weight_slabs',
			heading            : 'Weight Slabs',
			type               : 'fieldArray',
			noDeleteButtonTill : 1,
			value              : [{
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
					rules       : { required: 'lower limit is required' },
				},
				{
					name        : 'upper_limit',
					type        : 'number',
					span        : 4,
					placeholder : 'Upper Limit (in MT)',
					rules       : { required: 'upper limit is required' },
				},
				{
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					span        : 1.5,
					placeholder : 'Curr...',
					rules       : { required: 'currency is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 1.5,
					placeholder : 'Price',
					rules       : { required: 'price is required' },
				},
			],
		},
		{
			type               : 'fieldArray',
			heading            : 'Line Items',
			name               : 'line_items',
			showButtons        : true,
			buttonText         : 'Add Line Items',
			noDeleteButtonTill : 1,
			value              : [{
				code         : 'BAS',
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
					name        : 'unit',
					span        : 2,
					type        : 'select',
					className   : 'primary lg',
					placeholder : 'Unit',
					rules       : { required: 'is required' },
				},
				{
					name        : 'currency',
					span        : 1.5,
					type        : 'select',
					placeholder : 'Curr...',
					options     : currencyOptions,
					rules       : { required: 'is required' },
				},
				{
					name        : 'price',
					span        : 1.5,
					type        : 'number',
					placeholder : 'Amount',
					rules       : { required: 'is required' },
				},
				{
					name        : 'market_price',
					span        : 1.5,
					type        : 'number',
					placeholder : 'Market Price',
					rules       : { required: 'is required' },
				},
				{
					name        : 'remarks',
					span        : 2,
					type        : 'text',
					placeholder : 'Add remarks here',
				},
			],
		},
		{
			name               : 'container_slabs',
			heading            : 'Container Slabs',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Container Count Wise BAS Slabs',
			noDeleteButtonTill : 0,
			controls           : [
				{
					name        : 'lower_limit',
					type        : 'number',
					placeholder : 'Lower Limit',
					span        : 3,
				},
				{
					name        : 'upper_limit',
					type        : 'number',
					span        : 3,
					placeholder : 'Upper Limit',
				},
				{
					name        : 'currency',
					placeholder : 'Currency',
					type        : 'select',
					options     : currencyOptions,
					span        : 3,
				},
				{
					name        : 'price',
					placeholder : 'Enter Price',
					type        : 'number',
					span        : 2,
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default fclControls;
