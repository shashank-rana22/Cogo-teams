import { startCase } from '@cogoport/utils';

import currencies from '../helpers/currencies';

const nameMapping = {
	freights_charge_codes          : 'freights',
	destination_local_charge_codes : 'destination_local',
	origin_local_charge_codes      : 'origin_local',
	cfs_charge_codes               : 'freights',
	customs_charge_codes           : 'freights',
	haulage_charge_codes           : 'freights',
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
				code     : '',
				unit     : '',
				currency : '',
				price    : '',
			},
		],
		showButtons        : true,
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 0,
		controls           : [
			{
				name        : 'code',
				type        : 'select',
				label       : 'Charge Code',
				valueKey    : 'code',
				labelKey    : 'label',
				placeholder : 'Select Charge',
				span        : 3,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				label       : 'Unit',
				type        : 'select',
				span        : 2,
				rules       : { required: 'This is required' },
			},
			{
				placeholder : 'Currency',
				name        : 'currency',
				label       : 'Currency',
				type        : 'select',
				span        : 3,
				options     : currencies,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				type        : 'number',
				label       : 'Price',
				span        : 3,
				placeholder : 'Price Per Unit',
				rules       : { required: 'This is required', min: 0 },
			},
		],
	};

	return controls;
};
export default chargeControls;
