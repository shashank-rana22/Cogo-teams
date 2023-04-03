import { startCase } from '@cogoport/utils';

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		case 'containers_count': { return `${value} Container${value > 1 ? 's' : ''}`; }
		default: { return startCase(value); }
	}
};
