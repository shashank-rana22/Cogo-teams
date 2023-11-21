import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';

const ALLOWED_CURRENCY =	GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.feedback_services.allowed_currency;

const OPTIONS = getCurrencyOptions({ ALLOWED_CURRENCY });

const entityMarginControls = [
	{
		name               : 'margin_slabs',
		type               : 'fieldArray',
		noDeleteButtonTill : 1,
		buttonText         : 'Add Another Slab',
		showLabelOnce      : true,
		value              : [
			{
				lower_limit : '',
				upper_limit : '',
			},
		],
		controls: [
			{
				name  : 'lower_limit',
				label : 'Slab Lower Limit',
				type  : 'number',
				span  : 2,
				size  : 'sm',
				rules : { required: 'Lower Limit is required' },
			},
			{
				name  : 'upper_limit',
				label : 'Slab Upper Limit',
				type  : 'number',
				span  : 2,
				size  : 'sm',
				rules : { required: 'UpperLimit is required' },
			},
			{
				name    : 'limit_currency',
				label   : 'Currency',
				type    : 'select',
				caret   : true,
				options : OPTIONS,
				watch   : true,
				size    : 'sm',
				span    : 1.5,
				rules   : { required: 'Currency is required' },
			},
			{
				name    : 'type',
				label   : 'Margin type',
				type    : 'select',
				caret   : true,
				span    : 2,
				size    : 'sm',
				options : [
					{
						label : 'Percentage',
						value : 'percentage',
					},
					{
						label : 'Absolute, per shipment',
						value : 'absolute_total',
					},
					{
						label : 'Absolute, per unit',
						value : 'absolute_unit',
					},
				],
				watch : true,
				rules : { required: 'Type is required' },
			},
			{
				name        : 'value',
				label       : 'Margin value',
				type        : 'number',
				span        : 1.5,
				size        : 'sm',
				placeholder : 'Enter value',
				watch       : true,
				className   : 'code-value',
				rules       : { required: 'Value is required' },
			},
			{
				name         : 'min_value',
				label        : 'Min value ',
				type         : 'number',
				span         : 1,
				size         : 'sm',
				placeholder  : 'Enter value',
				validateOn   : ['onBlur'],
				watch        : true,
				className    : 'code-value',
				showOptional : false,
			},
			{
				name         : 'max_value',
				label        : 'Max value',
				span         : 1,
				size         : 'sm',
				type         : 'number',
				placeholder  : 'Enter value',
				validateOn   : ['onBlur'],
				showOptional : false,
				watch        : true,
				className    : 'code-value',
				rules        : { min: 0, message: 'Value cannot be less than 0' },
			},
		],
	},
];
export default entityMarginControls;
