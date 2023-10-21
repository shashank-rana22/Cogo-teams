import { currencyOptions } from '../helpers/constants';

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
			label       : 'Location',
			type        : 'select',
			placeholder : 'Location',
			span        : 4,
			value       : data?.location_id,
			disabled 	  : data?.location_id,
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
			heading      : 'Line Items',
			showOptional : false,
			span         : 12,
		},
		{
			label              : 'Add Custom Line Items',
			name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Custom Line Items',
			noDeleteButtonTill : 1,
			value              : [{
				customs_code : '',
				unit         : '',
				currency     : '',
				price        : '',
				market_price : '',
				remarks      : '',
			}],
			controls: [
				{
					name        : 'customs_code',
					valueKey    : 'code',
					type        : 'async_select',
					span        : 2,
					asyncKey    : 'list_rate_charge_codes',
					params      : { service_name: 'lcl_customs_charges' },
					initialCall : true,
					rules       : { required: 'Code is required' },
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
