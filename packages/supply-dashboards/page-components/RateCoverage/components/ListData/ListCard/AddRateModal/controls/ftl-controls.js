/* eslint-disable max-lines-per-function */

import { currencyOptions } from '../../../../../configurations/helpers/constants';
import { truck_types } from '../../../../../configurations/truck_types';

const ftlControls = ({
	data,
	fclCommodityOptions,
	originLocationOptions, destinationLocationOptions,
}) => {
	const controls = [
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
			name           : 'rate_provided',
			placeholder    : 'Rate Provided By LSP',
			label          : 'Rate Provided By LSP User',
			optionsListKey : 'organization-users',
			isClearable    : true,
			valueKey       : 'user_id',
			defaultOptions : true,
			span           : 4,
			type           : 'select',
			rules          : { required: true },
			className      : 'primary lg',
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
			heading : 'Location Details',
			name    : 'location_details',
			span    : 12,
		},
		{
			name        : 'origin_location_id',
			heading     : 'Origin Location',
			type        : 'select',
			placeholder : 'Origin Location',
			span        : 4,
			value       : data?.origin_port?.id,
			disabled	   : data?.origin_port?.id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			name        : 'origin_main_port_id',
			type        : 'select',
			heading     : 'Origin Main port',
			placeholder : 'Origin Main port',
			span        : 4,
			rules       : { required: 'origin main port is required' },
		},
		{
			name        : 'destination_location_id',
			type        : 'select',
			heading     : 'Destination Location',
			span        : 4,
			value       : data?.destination_port?.id,
			disabled    : data?.destination_port?.id,
			...destinationLocationOptions,
			placeholder : 'Destination Location',
			rules       : { required: 'destination location is required' },
		},
		{
			name        : 'destination_main_port_id',
			type        : 'select',
			heading     : 'Destination main port',
			span        : 4,
			placeholder : 'Destination main port',
			rules       : { required: 'destination main port is required' },
		},
		{
			name        : 'truck_type',
			placeholder : 'Select Truck Type',
			label       : 'Truck Type',
			type        : 'select',
			options     : truck_types,
			className   : 'primary lg',
			value       : data?.truck_type,
			span        : 4,
			rules       : { required: true },
		},
		{
			name        : 'commodity',
			heading     : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 3,
			value       : data?.commodity,
			disabled    : data?.commodity,
			options     : fclCommodityOptions,
			rules       : { required: 'commodity is required' },
		},
		{
			name        : 'body_type',
			placeholder : 'Select Body Type',
			label       : 'Body Type',
			type        : 'select',
			className   : 'primary lg',
			value       : data?.truck_body_type,
			span        : 4,
			options     : [
				{
					value : 'open',
					label : 'Open',
				},
				{ value: 'closed', label: 'Closed' },
			],
			rules: { required: true },
		},
		{
			name      : 'transit_time',
			label     : 'Transit time',
			type      : 'input-group',
			span      : 4,
			className : 'primary lg',
			value     : {
				transit_time_type  : 'hrs',
				transit_time_value : data?.transit_time,
			},
			inputControls: [
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
				required  : 'Required',
				inputType : 'group',
			},
		},
		{
			name      : 'detention_free_time',
			label     : 'Detention Free time',
			type      : 'input-group',
			span      : 4,
			className : 'primary lg',
			value     : {
				detention_free_time_type  : 'hrs',
				detention_free_time_value : data?.detention_free_time,
			},
			inputControls: [
				{
					name        : 'detention_free_time_type',
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
					name        : 'detention_free_time_value',
					type        : 'number',
					placeholder : '0',
					className   : 'primary lg',
				},
			],
			rules: {
				required  : 'Required',
				inputType : 'group',
			},
		},
		{
			name        : 'date_range',
			placeholder : 'Select Range',
			type        : 'datepicker',
			label       : 'Validity of Rate',
			span        : 4,
			minDate     : new Date(),
			pickerType  : 'range',
			rules       : { required: true },
			className   : 'primary',
		},
		{
			name        : 'unit',
			placeholder : 'Select Unit',
			type        : 'select',
			span        : 4,
			value       : data?.unit,
			label       : 'Unit',
			options     : [
				{
					label : 'Per Truck',
					value : 'per_truck',
				},
				{
					label : 'Per Ton',
					value : 'per_ton',
				},
			],
			defaultOptions : true,
			rules          : { required: true },
			className      : 'primary lg',
		},
		{
			name        : 'min_chargeable_weight',
			label       : 'Min Chargeable Weight',
			type        : 'number',
			placeholder : 'Select Min Chargeable Weight',
			span        : 4,
			rules       : { required: true },
			className   : 'primary lg',
			isClearable : true,
		},
		{
			name          : 'price_per_truck',
			label         : 'Basic Freight Rate',
			type          : 'input-group',
			span          : 4,
			className     : 'primary lg',
			inputControls : [
				{
					name        : 'currency',
					span        : 1.5,
					type        : 'select',
					placeholder : 'Curr...',
					options     : currencyOptions,
				},
				{
					name        : 'price_per_truck_value',
					type        : 'number',
					placeholder : '0',
					className   : 'primary lg',
				},
			],
			rules: {
				required  : 'Required',
				inputType : 'group',
			},
		},
		{
			name          : 'fuel_surcharge',
			label         : 'Fuel Surcharge',
			type          : 'input-group',
			span          : 4,
			className     : 'primary lg',
			inputControls : [
				{
					name        : 'fuel_surcharge_type',
					type        : 'select',
					placeholder : '% of Basic Freight',
					style       : {
						marginLeft  : '10%',
						marginRight : '10%',
					},
					options: [
						{
							value : 'percentage_of_freight',
							label : '% of Basic Freight',
						},
						{
							value : 'per_truck',
							label : 'Net',
						},
					],
					className: 'primary lg',
				},
				{
					name        : 'fuel_surcharge_value',
					type        : 'number',
					placeholder : '0',
					className   : 'primary lg hello',
				},
			],
			rules: {
				required  : 'Required',
				inputType : 'group',
			},
		},
		{
			name        : 'remarks',
			placeholder : 'Enter Remarks',
			type        : 'textarea',
			span        : 3.8,
			label       : 'Remarks',
			className   : 'primary lg ',
		},
	];
	return controls;
};

export default ftlControls;
