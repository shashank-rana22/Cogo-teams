/* eslint-disable max-lines-per-function */

import { commodityOptions, currencyOptions } from '../helpers/constants';

const LOCATION_TYPE_OPTIONS = [
	{
		label : 'City',
		value : 'city',
	},
	{
		label : 'Pin Code',
		value : 'pincode',
	},
	{
		label : 'Air Port',
		value : 'airport',
	},
	{
		label : 'Sea Port',
		value : 'seaport',
	},
	{
		label : 'Zone',
		value : 'zone',
	},
	{
		label : 'Country',
		value : 'country',
	},
];

const ltlControls = ({
	data,
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
			span        : 6,
			value       : data?.service_provider_id,
			rules       : { required: 'service provider is required' },
		},
		{
			name        : 'sourced_by_id',
			label       : 'Rate Provided by user',
			type        : 'select',
			placeholder : 'Rate Provided by user',
			value       : data?.sourced_by_id,
			span        : 6,
			rules       : { required: 'rate provided by user is required' },
		},

		{
			label       : 'Origin Type',
			name        : 'origin_type',
			type        : 'select',
			placeholder : 'City',
			span        : 2,
			options     : LOCATION_TYPE_OPTIONS,
			value       : data?.origin_location?.type,
		},
		{
			name           : 'origin_location_id',
			span           : 4,
			value          : data?.origin_location?.id,
			asyncKey       : 'list_locations',
			type           : 'async_select',
			isClearable    : true,
			defaultOptions : true,
			placeholder    : 'Origin Location',
			rules          : { required: 'This is required' },
			params         : {
				filters: {
					status: 'active',
				},
				page_limit      : 20,
				includes        : { default_params_required: true },
				recommendations : true,
			},
		},

		{
			label       : 'Destination Type',
			name        : 'destination_type',
			type        : 'select',
			value       : data?.destination_location?.type,
			placeholder : 'City',
			span        : 2,
			options     : LOCATION_TYPE_OPTIONS,
		},
		{
			name           : 'destination_location_id',
			span           : 4,
			value          : data?.destination_location?.id,
			asyncKey       : 'list_locations',
			type           : 'async_select',
			isClearable    : true,
			defaultOptions : true,
			placeholder    : 'Destination Location',
			rules          : { required: 'This is required' },
			params         : {
				filters: {
					status: 'active',
				},
				page_limit      : 20,
				includes        : { default_params_required: true },
				recommendations : true,
			},
		},

		{
			name        : 'commodity',
			placeholder : 'Select Commodity',
			label       : 'Commodity',
			type        : 'select',
			value       : data?.commodity,
			options     : commodityOptions,
			span        : 4,
			rules       : { required: 'commodity is required' },
		},
		{
			name        : 'density_factor',
			placeholder : 'Select Density Factor',
			label       : 'Density Factor',
			type        : 'select',
			value       : 'number',
			className   : 'primary lg',
			options     : [
				{
					label : '7',
					value : 7,
				},
				{
					label : '10',
					value : 10,
				},
			],
			span: 4,
		},
		{
			label       : 'Transit time',
			name        : 'transit_time_type',
			type        : 'select',
			placeholder : 'Hrs',
			span        : 2,
			options     : [
				{
					value : 'hrs',
					label : 'Hrs',
				},
				{
					value : 'days',
					label : 'Days',
				},
			],
		},
		{
			name        : 'transit_time',
			type        : 'number',
			placeholder : '0',
			className   : 'primary lg',
			span        : 2,
			rules       : { required: 'is required' },
		},
		{
			name        : 'date_range',
			placeholder : 'Select Range',
			type        : 'date_range',
			label       : 'Validity of Rate',
			span        : 4,
			rules       : { required: 'Date Range is required' },
		},
		{
			name        : 'currency',
			placeholder : 'Enter Currency',
			label       : 'Currency',
			type        : 'select',
			options     : currencyOptions,
			span        : 4,
			rules       : { required: 'currency is required' },
			className   : 'primary lg',
		},

		{
			name      : 'minimum_freight_charge',
			label     : 'Min Freight Charge',
			type      : 'number',
			span      : 4,
			className : 'primary lg',
			rules     : { required: 'is required' },
		},

		{
			name        : 'minimum_chargeable_weight',
			placeholder : 'Min Chargeable Weight',
			label       : 'Min Chargeable Weight( Per Kg )',
			type        : 'number',
			span        : 4,
			className   : 'primary lg',
			rules       : { required: 'is required' },
		},
		{
			name        : 'unit',
			placeholder : 'Enter Unit',
			label       : 'Unit',
			type        : 'select',
			span        : 4,
			options     : [
				{
					label : 'Per Kg',
					value : 'per_kg',
				},
				{
					label : 'Per shipment',
					value : 'per_shipment',
				},
				{
					label : 'Per package',
					value : 'per_package',
				},
			],
			rules: { required: 'is required' },
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
			type               : 'fieldArray',
			noDeleteButtonTill : 1,
			buttonText         : 'Add Weight Slabs',
			initialCount       : 0,
			value              : [
				{
					lower_limit : '',
					upper_limit : '',
					price       : '',
				},
			],
			controls: [
				{
					name        : 'lower_limit',
					label       : 'Slabs Lower Limit',
					type        : 'number',
					placeholder : 'Enter Lower Limit',
					span        : 2,
					className   : 'primary lg',
					rules       : {
						required: 'Lower Limit is required',
					},
				},
				{
					name        : 'upper_limit',
					label       : 'Slabs Upper Limit',
					type        : 'number',
					placeholder : 'Enter Upper Limit',
					span        : 2,
					className   : 'primary lg',
					rules       : {
						required: 'Upper Limit is required',
					},
				},
				{
					name        : 'price',
					value       : 'price',
					label       : 'Price',
					type        : 'number',
					placeholder : 'Price',
					span        : 2,
					className   : 'primary lg',
					rules       : {
						required: 'Price is required',
					},
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default ltlControls;
