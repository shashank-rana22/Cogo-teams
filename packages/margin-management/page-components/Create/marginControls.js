export default function getMarginControls({ service = '' }) {
	const service_name = `${service}_charges`;
	const marginControls = [{
		name               : 'margin_slabs',
		label              : 'Margin values',
		type               : 'nestedFieldArray',
		noDeleteButtonTill : 1,
		buttonText         : 'Add Another Field',
		controls           : [
			{
				name  : 'lower_limit',
				label : 'Lower Limit',
				type  : 'input',
				size  : 'md',
				span  : 2,
				rules : { required: 'Lower Limit is required' },
			},
			{
				name  : 'upper_limit',
				label : 'Upper Limit',
				type  : 'input',
				size  : 'md',
				span  : 2,
				rules : { required: 'Upper Limit is required' },
			},
			{
				name        : 'limit_currency',
				label       : 'Currency',
				type        : 'async_select',
				caret       : true,
				span        : 2,
				initialCall : true,
				asyncKey    : 'list_exchange_rate_currencies',
				rules       : { required: 'Currency is required' },
			},
			{
				name               : 'margin_values',
				label              : 'Line Items',
				type               : 'fieldArray',
				buttonText         : 'Add Field',
				noDeleteButtonTill : 1,
				controls           : [
					{
						name        : 'code',
						label       : 'Code',
						valueKey    : 'code',
						type        : 'async_select',
						initialCall : true,
						span        : 2,
						asyncKey    : 'list_rate_charge_codes',
						params      : { service_name, page_limit: 10 },
						rules       : { required: 'Code is required' },
					},
					{
						name    : 'type',
						label   : 'Margin type',
						type    : 'select',
						span    : 2,
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

						rules: { required: 'Type is required' },
					},
					{
						name        : 'value',
						label       : 'Margin value',
						type        : 'number',
						span        : 2,
						placeholder : 'Enter value',
						className   : 'code-value',
						rules       : { required: 'Value is required' },
					},
					{
						name        : 'currency',
						label       : 'Currency',
						type        : 'async_select',
						initialCall : true,
						caret       : true,
						span        : 2,
						asyncKey    : 'list_exchange_rate_currencies',

						rules: { required: 'Currency is required' },
					},
					{
						name         : 'min_value',
						label        : 'Min value ',
						type         : 'number',
						span         : 2,
						placeholder  : 'Enter value',
						className    : 'code-value',
						showOptional : false,
					},
					{
						name         : 'max_value',
						label        : 'Max value',
						span         : 2,
						type         : 'number',
						placeholder  : 'Enter value',
						showOptional : false,
						className    : 'code-value',
						rules        : { min: 0, message: 'Value cannot be less than 0' },
					},
				],
			},
		],
	}];
	return marginControls;
}
