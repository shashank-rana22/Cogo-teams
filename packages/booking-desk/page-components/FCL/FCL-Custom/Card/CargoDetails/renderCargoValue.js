import { startCase } from '@cogoport/utils';

const SINGLE_COUNT = 1;

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		case 'containers_count': { return `${value} Container${value > SINGLE_COUNT ? 's' : ''}`; }
		default: { return startCase(value); }
	}
};
