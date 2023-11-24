import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import { currencyOptions, rateTypeOptions } from '../helpers/constants';

const fclRateSpecificLocal = ({
	data,
	listShippingLineOptions,
}) => {
	const controls = [
		{
			heading : 'Basic Details',
			name    : 'basic_details',
			span    : 12,
		},
		{
			name        : 'rate_type',
			type        : 'select',
			label       : 'Rate Type',
			span        : 12,
			placeholder : 'Rate Type',
			options     : rateTypeOptions,
			value       : data?.rate_type,
			rules       : {
				required: 'rate type is required',
			},
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			type        : 'select',
			placeholder : 'Container Type',
			span        : 12,
			value       : data?.container_type || 'standard',
			options     : containerTypes,
			rules       : { required: 'container type is required' },
		},
		{
			name        : 'container_size',
			label       : 'Container Size',
			type        : 'select',
			placeholder : 'Container Size',
			span        : 12,
			value       : data?.container_size || '20',
			options     : containerSizes,
			rules       : { required: 'container size is required' },
		},
		{
			name        : 'commodity',
			label       : 'Commodity',
			type        : 'select',
			placeholder : 'Commodity',
			span        : 12,
			value       : data?.commodity || 'all_commodities',
			disabled    : true,
		},
		{
			name        : 'shipping_line_id',
			label       : 'Shipping Line',
			type        : 'select',
			placeholder : 'Shipping Line',
			span        : 12,
			value       : data?.shipping_line_id,
			...listShippingLineOptions,
			rules       : { required: 'shipping line is required' },
		},
		{
			label              : 'Add Line Items',
			name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : true,
			buttonText         : 'Add Line Items',
			charge_code_name   : 'local_charge_codes',
			span               : 12,
			noDeleteButtonTill : 1,
			value              : [
				{
					code     : '',
					unit     : '',
					price    : '',
					currency : '',
				},
			],
			controls: [
				{
					label       : 'code',
					name        : 'code',
					type        : 'select',
					span        : 3,
					placeholder : 'Charge Name',
					rules       : { required: 'is required' },
				},
				{
					name        : 'unit',
					placeholder : 'Unit',
					label       : 'Unit',
					type        : 'select',
					span        : 2,
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					label       : 'Currency',
					name        : 'currency',
					type        : 'select',
					options     : currencyOptions,
					placeholder : 'Currency',
					className   : 'primary lg',
					span        : 2,
					rules       : { required: 'This is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					label       : 'Price',
					span        : 2,
					placeholder : 'Price Per Unit',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					name        : 'remark',
					type        : 'text',
					placeholder : 'remarks',
					label       : 'Remarks',
					span        : 2,
					className   : 'primary lg',
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default fclRateSpecificLocal;
