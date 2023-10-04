/* eslint-disable max-lines-per-function */

const ltlControls = ({
	data,
	fclCommodityOptions,
}) => [
	{
		name    : 'service_provicer_details',
		heading : 'Service Provider Details',
		span    : 12,
	},
	{
		name        : 'service_provider_id',
		heading     : 'Service Provider',
		type        : 'select',
		placeholder : 'Service Provider',
		span        : 4,
		value       : data?.service_provider_id,
		rules       : { required: 'service provider is required' },
	},
	{
		name        : 'sourced_by_id',
		heading     : 'Rate Provided by user',
		type        : 'select',
		placeholder : 'Rate Provided by user',
		value       : data?.sourced_by_id,
		span        : 4,
		rules       : { required: 'rate provided by user is required' },
	},

	{
		name          : 'origin',
		label         : 'Origin',
		type          : 'input-group',
		className     : 'primary lg',
		span          : 4,
		inputControls : [
			{
				name        : 'origin_type',
				type        : 'select',
				placeholder : 'City',
				options     : [
					{
						value : 'city',
						label : 'City',
					},
					{
						value : 'pincode',
						label : 'Pin Code',
					},
					{
						value : 'airport',
						label : 'Air Port',
					},
					{
						value : 'seaport',
						label : 'Sea Port',
					},
					{
						value : 'zone',
						label : 'Zone',
					},
					{
						value : 'country',
						label : 'Country',
					},
				],
				className: 'primary lg',
			},
			{
				name        : 'origin_value',
				type        : 'select',
				placeholder : 'Select Origin',
				className   : 'primary lg',
				value       : origin,
				isClearable : true,
				// defaultOptions: true,
			},
		],
		rules: {
			required  : true,
			inputType : 'group',
		},
	},
	{
		name          : 'destination',
		label         : 'Destination',
		type          : 'input-group',
		className     : 'primary lg',
		span          : 4,
		inputControls : [
			{
				name        : 'destination_type',
				type        : 'select',
				placeholder : 'City',

				options: [
					{
						value : 'city',
						label : 'City',
					},
					{
						value : 'pincode',
						label : 'Pin Code',
					},
					{
						value : 'airport',
						label : 'Air Port',
					},
					{
						value : 'seaport',
						label : 'Sea Port',
					},
					{
						value : 'zone',
						label : 'Zone',
					},
					{
						value : 'country',
						label : 'Country',
					},
				],
				className: 'primary lg',
			},
			{
				name        : 'destination_value',
				type        : 'select',
				placeholder : 'Select Destination',
				className   : 'primary lg',
				isClearable : true,
			},
		],
		rules: {
			required  : true,
			inputType : 'group',
		},
	},
	{
		name          : 'commodity',
		placeholder   : 'Select Commodity',
		label         : 'Commodity',
		type          : 'select',
		className     : 'primary lg',
		commodityType : 'ftl_freight',
		value         : fclCommodityOptions,
		span          : 4,
		rules         : {
			required: true,
		},
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
		name          : 'transit_time',
		label         : 'Transit time',
		type          : 'input-group',
		span          : 4,
		value         : { transit_time_type: 'hrs', transit_time_value: '' },
		className     : 'primary lg',
		inputControls : [
			{
				name        : 'transit_time_type',
				type        : 'select',
				placeholder : 'Hrs',
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
				className: 'primary lg',
			},
			{
				name        : 'transit_time_value',
				type        : 'number',
				placeholder : '0',
				className   : 'primary lg',
			},
		],
		rules: {
			required  : true,
			inputType : 'group',
		},
	},
	{
		name        : 'date_range',
		placeholder : 'Select Range',
		type        : 'datepicker',
		label       : 'Validity of Rate',
		span        : 4,
		pickerType  : 'range',
		rules       : {
			required: true,
		},
		className: 'primary lg date',
	},

	{
		name           : 'currency',
		placeholder    : 'Enter Currency',
		label          : 'Currency',
		type           : 'select',
		optionsListKey : 'currencies',
		span           : 4,
		rules          : {
			required: true,
		},
		className: 'primary lg',
	},

	{
		name      : 'min_freight_charge',
		value     : 'min_freight_charge',
		label     : 'Min Freight Charge',
		type      : 'number',
		span      : 4,
		className : 'primary lg',
		rules     : {
			required: true,
		},
	},

	{
		name        : 'min_chargeable_weight',
		value       : 'min_chargeable_weight',
		placeholder : 'Min Chargeable Weight',
		label       : 'Min Chargeable Weight( Per Kg )',
		type        : 'number',
		span        : 4,
		rules       : {
			required: true,
		},
		className: 'primary lg',
	},
	{
		name        : 'unit',
		placeholder : 'Enter Unit',
		label       : 'Unit',
		type        : 'select',
		span        : 4,
		rules       : {
			required: true,
		},
		className: 'primary lg',
	},

	{
		name               : 'slabs',
		type               : 'fieldArray',
		noDeleteButtonTill : 1,
		buttonText         : '',
		initialCount       : 0,
		value              : [
			{
				lower_limit : 0,
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
export default ltlControls;
