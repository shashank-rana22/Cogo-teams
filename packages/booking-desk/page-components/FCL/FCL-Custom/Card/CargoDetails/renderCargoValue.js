import { startCase } from '@cogoport/utils';

import NUMERICAL_VALUES from '../../../../../config/NUMERICAL_VALUES.json';

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		case 'containers_count': { return `${value} Container${
			value > NUMERICAL_VALUES.MINIMUM_COUNT_FOR_PLURAL ? 's' : ''
		}`; }
		default: { return startCase(value); }
	}
};
