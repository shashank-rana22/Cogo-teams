import { startCase } from '@cogoport/utils';

import currencies from '../helpers/currencies';

const nameMapping = {
	freights_charge_codes          : 'freights',
	destination_local_charge_codes : 'destination_local',
	origin_local_charge_codes      : 'origin_local',
	cfs_charge_codes               : 'line_items',
	customs_charge_codes           : 'line_items',
};

const chargeControls = ({ heading = '', charge_code_name }) => {
	const name = nameMapping[charge_code_name];
	const controls = 		{
		name,
		type    : 'fieldArray',
		heading : startCase(heading),
		charge_code_name,
		value   : [
			{
				code     : 'BAS',
				unit     : 'per_bl',
				currency : 'USD',
				price    : '',
			},
		],
		showButtons        : true,
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'code',
				caret       : true,
				type        : 'select',
				valueKey    : 'code',
				labelKey    : 'label',
				placeholder : 'Select Charge',
				className   : 'primary lg',
				span        : 3,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : 2,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				placeholder : 'Currency',
				name        : 'currency',
				type        : 'select',
				span        : 3,
				options     : currencies,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				type        : 'number',
				span        : 3,
				placeholder : 'Price Per Unit',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
		],
	};

	return controls;
};
export default chargeControls;
