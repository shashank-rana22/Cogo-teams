import { startCase, upperCase } from '@cogoport/utils';

import NUMERICAL_VALUES from '../../../../../config/NUMERICAL_VALUES.json';

export const renderValue = (label, value, allDetails) => {
	switch (label) {
		case 'inco_term': { return `Inco - ${upperCase(value)}`; }
		case 'weight': { return `${value} kgs`; }
		case 'volume': { return ` ${value} cbm ${`, Chargeable Weight: ${Math.max(
			value * NUMERICAL_VALUES.chargable_weight_factor,
			allDetails?.weight,
		).toFixed(NUMERICAL_VALUES.two)} kg`}`; }
		default: { return startCase(value); }
	}
};
