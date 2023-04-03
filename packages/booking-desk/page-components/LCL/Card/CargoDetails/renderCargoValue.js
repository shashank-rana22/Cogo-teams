import { startCase, upperCase } from '@cogoport/utils';

export const renderValue = (label, value, allDetails) => {
	switch (label) {
		case 'inco_term': { return `Inco - ${upperCase(value)}`; }
		case 'weight': { return `${value} kgs`; }
		case 'volume': { return ` ${value} cbm ${`, Chargeable Weight: ${Math.max(
			value * 166.67,
			allDetails?.weight,
		).toFixed(2)} kg`}`; }
		default: { return startCase(value); }
	}
};
