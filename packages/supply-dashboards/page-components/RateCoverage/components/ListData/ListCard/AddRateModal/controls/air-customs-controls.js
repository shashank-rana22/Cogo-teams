import { currencyOptions } from '../../../../../configurations/helpers/constants';

const airCustomsControls = ({
	data,
	fclCommodityOptions,
	originLocationOptions,
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
		name         : 'location_details',
		label        : 'Location Details',
		span         : 12,
		showOptional : false,
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
		name        : 'trade_type',
		placeholder : 'Select Trade Type',
		value       : data?.trade_type,
		disabled    : data?.trade_type,
		options     : [
			{
				label : 'Export',
				value : 'export',
			},
			{
				label : 'Import',
				value : 'import',
			},
		],
		type      : 'select',
		span      : 4,
		className : 'primary lg',
		caret     : true,
		rules     : { required: 'This is required' },
	},
	{
		name         : 'container_details',
		label        : 'Commodity',
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
		name         : 'line_items',
		label        : 'Line Items',
		span         : 12,
		showOptional : false,
	},
	{
		label              : 'Add Custom Line Items',
		name               : 'customs_line_items',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Custom Line Items',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name           : 'code',
				caret          : true,
				type           : 'select',
				defaultOptions : true,
				showToolTip    : true,
				valueKey       : 'code',
				placeholder    : 'Select Charge',
				span           : 2,
				rules          : { required: 'This is required' },
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
				placeholder : 'Enter amount',
				rules       : { required: 'This is required' },
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
				span        : 3,
			},
		],
	},
];

export default airCustomsControls;
