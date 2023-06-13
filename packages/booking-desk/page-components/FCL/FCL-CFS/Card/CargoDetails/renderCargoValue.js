import { startCase } from '@cogoport/utils';

const MINIMUM_COUNT_FOR_PLURAL = 1;

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		case 'containers_count': { return `${value} Container${value > MINIMUM_COUNT_FOR_PLURAL ? 's' : ''}`; }
		default: { return startCase(value); }
	}
};
