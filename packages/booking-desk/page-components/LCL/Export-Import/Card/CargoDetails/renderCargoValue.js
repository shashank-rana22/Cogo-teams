import { startCase, upperCase } from '@cogoport/utils';

import NUMERICAL_VALUES from '../../../../../config/NUMERICAL_VALUES.json';

const PRECISION_LENGTH = 2;

export const renderValue = (label, value, allDetails) => {
	switch (label) {
		case 'inco_term': { return `Inco - ${upperCase(value)}`; }
		case 'weight': { return `${value} kgs`; }
		case 'volume': { return ` ${value} cbm ${`, Chargeable Weight: ${Math.max(
			value * NUMERICAL_VALUES.CHARGABLE_WEIGHT_FACTOR,
			allDetails?.weight,
		).toFixed(PRECISION_LENGTH)} kg`}`; }
		default: { return startCase(value); }
	}
};
