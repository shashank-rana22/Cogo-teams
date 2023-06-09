import { startCase, upperCase } from '@cogoport/utils';

const CONTAINER_COUNT = 1;
export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': { return value?.includes('HC') ? value?.replace('HC', 'ft HC') : `${value}ft`; }

		case 'containers_count': { return `${value} Container${value > CONTAINER_COUNT ? 's' : ''}`; }

		case 'inco_term': { return `Inco - ${upperCase(value)}`; }

		case 'cargo_weight_per_container': { return `${value} MT`; }

		case 'volume': { return `${value} cbm`; }

		case 'weight': { return `${value}kgs`; }

		default: { return startCase(value); }
	}
};
