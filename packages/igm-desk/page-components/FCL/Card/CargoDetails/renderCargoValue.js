import { startCase, upperCase } from '@cogoport/utils';

const VALUE_LENGTH = 1;

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		case 'containers_count': { return `${value} Container${
			value > VALUE_LENGTH ? 's' : ''
		}`; }
		case 'inco_term': { return `Inco - ${upperCase(value)}`; }
		case 'cargo_weight_per_container': { return `${value} MT`; }
		default: { return startCase(value); }
	}
};
