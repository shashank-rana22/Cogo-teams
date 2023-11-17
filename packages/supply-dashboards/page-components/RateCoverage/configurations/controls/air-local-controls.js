import { currencyOptions } from '../helpers/constants';

const THRESHOLD = 0;
const COMMODITY_TYPE_OPTIONS = {
	general: [
		{ label: 'All', value: 'all' },
	],
	special_consideration: [
		{ label: 'Dangerous Goods', value: 'dangerous' },
		{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
		{ label: 'Other Special Commodity Sub Type', value: 'other_special' },
	],
};
const airLocalControls = ({ data, serviceIdPresent }) => {
	const controls = [
		{
			name        : 'service_provider_id',
			label       : 'Service Provider',
			type        : 'select',
			placeholder : 'Service Provider',
			span        : 4,
			value       : serviceIdPresent || data?.service_provider_id,
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
			name        : 'commodity_type',
			type        : 'select',
			label       : 'Commodity Type',
			placeholder : 'Select Commodity Type',
			span        : 4,
			options     : COMMODITY_TYPE_OPTIONS[data?.commodity],
			rules       : {
				required: true,
			},
			isClearable: true,
		},
		{
			label              : 'Add Line Items',
			name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Line Items',
			noDeleteButtonTill : 1,
			value              : [
				{
					code      : '',
					unit      : '',
					price     : '',
					min_price : '',
				},
			],
			controls: [
				{
					name        : 'code',
					type        : 'select',
					span        : 2,
					placeholder : 'Charge Name',
					rules       : { required: 'is required' },
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					type        : 'select',
					span        : 1.5,
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'currency',
					span        : 1.5,
					type        : 'select',
					placeholder : 'Currency',
					options     : currencyOptions,
					rules       : { required: 'Currency is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 1.5,
					placeholder : 'Price/Unit',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},

				{
					name        : 'min_price',
					span        : 1.5,
					type        : 'number',
					className   : 'primary lg',
					placeholder : 'Min Price',
					rules       : {
						required : 'Min Price is required',
						validate : (value) => (value < THRESHOLD ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'remarks',
					type        : 'text',
					placeholder : 'remarks',
					span        : 3,
					className   : 'primary lg',
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default airLocalControls;
