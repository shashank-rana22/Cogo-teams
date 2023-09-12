// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';

// // import formFieldValues from '../../helpers/formFieldValues';

// const ALLOWED_CURRENCY = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
// 	.services.feedback_services.allowed_currency;

// const OPTIONS = getCurrencyOptions({ ALLOWED_CURRENCY });
export const marginControls = [{
	name               : 'margin_slabs',
	label              : 'Margin values',
	type               : 'fieldArray',
	noDeleteButtonTill : 1,
	buttonText         : 'Add Another Field',
	value              : [
		{
			lower_limit : '',
			upper_limit : '',
		},
	],
	controls: [
		{
			name  : 'lower_limit',
			label : 'Lower Limit',
			type  : 'number',
			size  : 'lg',
			span  : 4,
			rules : { required: 'Lower Limit is required' },
		},
		{
			name  : 'upper_limit',
			label : 'Upper Limit',
			type  : 'number',
			size  : 'lg',
			span  : 4,
			rules : { required: 'UpperLimit is required' },
		},
		{
			name  : 'limit_currency',
			label : 'Currency',
			type  : 'select',
			caret : true,
			span  : 4,
			// options : OPTIONS,
			watch : true,
			rules : { required: 'Currency is required' },
		},
		{
			name               : 'margin_values',
			label              : 'Line Items',
			type               : 'fieldArray',
			buttonText         : 'Add Field',
			noDeleteButtonTill : 1,
			value              : {
				code      : '',
				type      : '',
				value     : '',
				currency  : '',
				min_value : '',
				max_value : '',
			},
			controls: [
				{
					name     : 'code',
					label    : 'Code',
					type     : 'select',
					value    : '',
					span     : 2.5,
					valueKey : 'code',
					labelKey : 'name',
					caret    : true,
					watch    : true,
					rules    : { required: 'Code is required' },
				},
				{
					name    : 'type',
					label   : 'Margin type',
					type    : 'select',
					span    : 2.5,
					caret   : true,
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
					span        : 2.5,
					placeholder : 'Enter value',
					watch       : true,
					className   : 'code-value',
					rules       : { required: 'Value is required' },
				},
				{
					name  : 'currency',
					label : 'Currency',
					type  : 'select',
					caret : true,
					span  : 2.5,
					// options : OPTIONS,
					watch : true,
					rules : { required: 'Currency is required' },
				},
				{
					name         : 'min_value',
					label        : 'Min value ',
					type         : 'number',
					span         : 2.5,
					placeholder  : 'Enter value',
					validateOn   : ['onBlur'],
					watch        : true,
					className    : 'code-value',
					showOptional : false,
				},
				{
					name         : 'max_value',
					label        : 'Max value',
					span         : 2.5,
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
	],
	// validateFn: (field, callback) => {
	// 	formFieldValues(field, callback);
	// },
}];
