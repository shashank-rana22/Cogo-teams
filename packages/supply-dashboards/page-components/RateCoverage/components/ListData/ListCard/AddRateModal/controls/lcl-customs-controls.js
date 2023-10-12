import { currencyOptions } from '../../../../../configurations/helpers/constants';

const lclCustomsControls = ({
	data,
	CommodityOptions,
	originLocationOptions,
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
			name         : 'location_details',
			heading      : 'Location Details',
			span         : 12,
			showOptional : false,
		},
		{
			name        : 'origin_location_id',
			label       : 'Origin Location',
			type        : 'select',
			placeholder : 'Origin Location',
			span        : 4,
			value       : data?.origin_port?.id,
			disabled 	  : data?.origin_port?.id,
			...originLocationOptions,
			rules       : { required: 'origin location is required' },
		},
		{
			label       : 'Trade Type',
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
			label       : 'Commodity',
			name        : 'commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 4,
			value       : data?.commodity,
			options     : CommodityOptions,
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
			name         : 'line_items',
			heading      : 'Line Items',
			span         : 12,
			showOptional : false,
		},
		{
			label              : 'Add Custom Line Items',
			name               : 'customs_line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Custom Line Items',
			noDeleteButtonTill : 0,
			controls           : [
				{
					name        : 'code',
					type        : 'select',
					span        : 2,
					placeholder : 'Charge Name',
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
	return controls.filter((control) => control !== null);
};

export default lclCustomsControls;
