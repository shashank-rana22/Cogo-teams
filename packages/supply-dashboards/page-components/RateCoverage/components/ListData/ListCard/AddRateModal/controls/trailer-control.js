/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions } from '../../../../../configurations/helpers/constants';

const TOTAL_HOURS = 24;
const trailerControls = ({
	data,
	fclCommodityOptions,
	originLocationOptions, destinationLocationOptions,
	transit_time_type,
	transit_time_value,
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
			name        : 'sourced_by_id',
			heading     : 'Rate Provided by user',
			type        : 'select',
			placeholder : 'Rate Provided by user',
			value       : data?.sourced_by_id,
			span        : 4,
			rules       : { required: 'rate provided by user is required' },
		},
		{
			name           : 'rate_procured',
			placeholder    : 'Rate Procured',
			type           : 'select',
			valueKey       : 'user_id',
			span           : 4,
			label          : 'Rate Procured by Cogoport Agent',
			optionsListKey : 'partner-users',
			defaultOptions : true,
			rules          : {
				required: true,
			},
			isClearable : true,
			className   : 'primary lg',
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
			heading : 'Container Details',
			name    : 'container_details',
			span    : 12,
		},
		{
			name        : 'container_type',
			heading     : 'Container Type',
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
			heading     : 'Container Size',
			type        : 'select',
			placeholder : 'Container Size',
			span        : 3,
			value       : data?.container_size || '20',
			disabled    : data?.container_size,
			options     : containerSizes,
			rules       : { required: 'container size is required' },
		},
		{
			name        : 'trailer_type',
			placeholder : 'Select Trailer Type',
			label       : 'Trailer Type',
			type        : 'select',
			className   : 'primary lg',
			options     : [
				{
					value : 'flat_bed',
					label : 'Flat Bed',
				},
				{
					value : 'semi_flat_bed',
					label : 'Semi Flat Bed',
				},
				{
					value : 'xl_bed',
					label : 'XL Bed',
				},
			],
			span  : 4,
			rules : {
				required: true,
			},
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
			name        : 'date_range',
			placeholder : 'Select Range',
			type        : 'datepicker',
			label       : 'Validity of Rate',
			span        : 4,
			minDate     : new Date(),
			pickerType  : 'range',
			rules       : {
				required: true,
			},
			className: 'primary',
		},
		{
			name      : 'detention_free_time',
			label     : 'Detention Free time',
			type      : 'input-group',
			span      : 4,
			className : 'primary lg',
			value     : {
				detention_free_time_type  : 'hrs',
				detention_free_time_value : '',
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
			name      : 'transit_time',
			label     : 'Transit time',
			type      : 'input-group',
			span      : 4,
			className : 'primary lg',
			value     : {
				transit_time_type: 'hrs',
				transit_time_value:
					transit_time_type === 'days'
						? transit_time_value * TOTAL_HOURS
						: transit_time_value,
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
			name          : 'price_per_trailer',
			label         : 'Basic Freight Rate (Per Trailer)',
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
					name        : 'price_per_trailer_value',
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
							value : 'per_trailer',
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

export default trailerControls;
