/* eslint-disable max-lines-per-function */

import { currencyOptions } from '../helpers/constants';
import { truck_types } from '../truck-types';

import styles from './styles.module.css';

const ftlControls = ({
	data,
	originLocationOptions, destinationLocationOptions,
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
			disabled    : data?.origin_location_id,
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
			value       : data?.destination_location_id,
			disabled    : data?.destination_location_id,
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
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 4,
			value       : data?.commodity,
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
			rules       : { required: true },
		},

		{
			label       : 'Detention time',
			name        : 'detention_free_time_type',
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
			name        : 'detention_free_time',
			type        : 'number',
			span        : 2,
			placeholder : '0',
			className   : 'primary lg',
			rules       : { required: true },
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
			label       : 'Basic Freight Rate',
			name        : 'currency',
			span        : 2,
			type        : 'select',
			placeholder : 'Curr...',
			options     : currencyOptions,
		},
		{
			name        : 'price_per_truck',
			type        : 'number',
			placeholder : '0',
			span        : 2,
			className   : 'primary lg',
		},
		{
			label       : 'Fuel Surcharge',
			name        : 'fuel_surcharge_type',
			type        : 'select',
			span        : 1.5,
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
			span        : 2.5,
			name        : 'fuel_surcharge_value',
			type        : 'number',
			placeholder : '0',
			className   : 'primary lg hello',
		},
		{
			name        : 'remarks',
			placeholder : 'Enter Remarks',
			type        : 'textarea',
			span        : 4,
			label       : 'Remarks',
			className   : 'primary lg ',
		},
		source === 'live_booking'
			? {
				name  : 'is_shipper_specific',
				label : 'Shipper Specific Rate',
				type  : 'checkbox',
				span  : 4,
			}
			: null,
	];
	return controls.filter((control) => control !== null);
};

export default ftlControls;
