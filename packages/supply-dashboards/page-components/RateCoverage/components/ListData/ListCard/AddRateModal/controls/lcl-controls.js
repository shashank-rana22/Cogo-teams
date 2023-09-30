/* eslint-disable max-lines-per-function */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { currencyOptions } from '../../../../../configurations/helpers/constants';

const lclControls = ({
	data,
	fclCommodityOptions,
	originLocationOptions, destinationLocationOptions,
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
		label        : 'Commodity',
		name         : 'commodities',
		showOptional : false,
		span         : 12,
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
		name         : 'others',
		span         : 12,
		label        : 'Others',
		showOptional : false,
	},
	{
		name        : 'validity',
		type        : 'datepicker',
		span        : 4,
		pickerType  : 'range',
		placeholder : 'Date Validty',
		minDate     : new Date(),
		rules       : {
			required: 'Validity End date is required',
		},
	},

	{
		name        : 'departure_dates',
		type        : 'departure-dates',
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
		span        : 2,
		rules       : { required: 'This is required' },
	},

	{
		name        : 'transit_time',
		type        : 'number',
		placeholder : 'Enter Transit time (days)',
		className   : 'primary lg',
		span        : 2,
		rules       : { required: 'This is required' },
	},
	{
		label        : 'Line Items',
		name         : 'line_item',
		showOptional : false,
		span         : 12,
	},

	{
		type               : 'fieldArray',
		showButtons        : true,
		name               : 'line_items',
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		value              : [
			{
				code      : 'BAS',
				unit      : 'per_wm',
				currency  : GLOBAL_CONSTANTS.currency_code.USD,
				min_price : null,
				price     : null,
			},
		],
		controls: [
			{
				name        : 'code',
				type        : 'select',
				span        : 2,
				valueKey    : 'code',
				placeholder : 'Charge Name',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				span        : 1.5,
				type        : 'select',
				className   : 'primary lg',
				placeholder : 'Unit',
				rules       : { required: 'This is required' },
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
export default lclControls;
