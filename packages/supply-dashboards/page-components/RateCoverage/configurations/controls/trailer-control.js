/* eslint-disable max-lines-per-function */
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions } from '../helpers/constants';

import styles from './styles.module.css';

const trailerControls = ({
	data,
	originLocationOptions, destinationLocationOptions,
	user_id,
	listPartnerUserOptions,
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
			name        : 'procured_by_id',
			heading     : 'Rate Procured by Cogoport Agent',
			placeholder : 'Rate Procured by Cogoport Agent',
			type        : 'select',
			...listPartnerUserOptions,
			value       : user_id,
			span        : 4,
			rules       : { required: 'procured by is required' },
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
			value       : data?.origin_location_id,
			disabled	   : data?.origin_location_id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			name        : 'destination_location_id',
			type        : 'select',
			heading     : 'Destination Location',
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
			span        : 4,
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
			span        : 4,
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
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 4,
			value       : data?.commodity,
			rules       : { required: 'commodity is required' },
		},
		{
			label     : 'Validity Start',
			name      : 'validity_start',
			type      : 'date_picker',
			className : styles.air_date_filter,
			span      : 4,
			rules     : { required: 'validity is required' },
		},
		{
			label     : 'Validity End',
			name      : 'validity_end',
			type      : 'date_picker',
			className : styles.air_date_filter,
			span      : 4,
			rules     : { required: 'validity end is required' },
		},
		{
			label       : 'Detention Free Time',
			name        : 'detention_free_time_type',
			type        : 'select',
			placeholder : 'Hrs',

			span    : 2,
			options : [
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
			name        : 'detention_free_time',
			type        : 'number',
			span        : 2,
			placeholder : '0',
			className   : 'primary lg',
			rules       : {
				required: true,
			},
		},

		{
			label       : 'Transit Time',
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
			className: 'primary lg',
		},
		{
			name        : 'transit_time',
			type        : 'number',
			span        : 2,
			placeholder : '0',
			className   : 'primary lg',
			rules       : {
				required: true,
			},
		},

		{
			label       : 'Basic Freight Rate (Per Trailer)',
			name        : 'currency',
			span        : 2,
			type        : 'select',
			placeholder : 'Curr...',
			options     : currencyOptions,
		},
		{
			name        : 'price_per_trailer',
			type        : 'number',
			span        : 2,
			placeholder : '0',
			className   : 'primary lg',
			rules       : {
				required: true,
			},
		},

		{
			label       : 'Fuel Surcharge',
			name        : 'fuel_surcharge_type',
			type        : 'select',
			span        : 2,
			placeholder : '% of Basic Freight',
			options     : [
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
			name        : 'fuel_surcharge',
			type        : 'number',
			placeholder : '0',
			span        : 2,
			className   : 'primary lg hello',
			rules       : {
				required: true,
			},
		},
		source === 'live_booking'
			? 			{
				name  : 'is_shipper_specific',
				label : 'Shipper Specific Rate',
				type  : 'checkbox',
				span  : 4,
			}
			: null,
		{
			name        : 'remarks',
			placeholder : 'Enter Remarks',
			type        : 'textarea',
			span        : 4,
			label       : 'Remarks',
			className   : 'primary lg ',
		},
	];
	return controls.filter((control) => control !== null);
};

export default trailerControls;
