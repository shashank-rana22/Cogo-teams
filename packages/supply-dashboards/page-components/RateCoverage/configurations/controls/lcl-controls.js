/* eslint-disable max-lines-per-function */

import { currencyOptions } from '../helpers/constants';

const lclControls = ({
	data,
	CommodityOptions,
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
			span    : 12,
		},
		{
			name        : 'origin_location_id',
			label       : 'Origin Location',
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
			label       : 'Destination Location',
			type        : 'select',
			span        : 4,
			value       : data?.destination_port?.id,
			disabled    : data?.destination_port?.id,
			...destinationLocationOptions,
			placeholder : 'Destination Location',
			rules       : { required: 'destination location is required' },
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
			heading      : 'others',
			span         : 12,
			label        : 'Others',
			showOptional : false,
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
			name        : 'departure_dates',
			type        : 'departure_date',
			label       : 'Departure Dates',
			span        : 4,
			placeholder : 'Enter Departure Dates',
			className   : 'primary sm',
			datePair    : {},
			rules       : { required: 'This is required' },
		},
		{
			name        : 'number_of_stops',
			type        : 'number',
			placeholder : 'Enter No. of Stops',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
		},

		{
			name        : 'transit_time',
			type        : 'number',
			placeholder : 'Enter Transit time (days)',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
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
			name         : 'line_item',
			showOptional : false,
			span         : 12,
		},
		{
			type               : 'fieldArray',
			showButtons        : true,
			name               : 'line_items',
			buttonText         : 'Add Line Items',
			noDeleteButtonTill : 0,
			controls           : [
				{
					name        : 'code',
					type        : 'select',
					span        : 2,
					placeholder : 'Charge Name',
				},
				{
					name        : 'unit',
					span        : 1.5,
					type        : 'select',
					className   : 'primary lg',
					placeholder : 'Unit',
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
					span        : 2,
					placeholder : 'Type Amount here...',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'min_price',
					type        : 'number',
					span        : 2.5,
					placeholder : 'Type minimum price...',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'cbm_weight_ratio',
					type        : 'number',
					placeholder : 'Type Weight Ratio',
					className   : 'primary lg',
					span        : 1.5,
					rules       : { required: 'This is required' },
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default lclControls;
