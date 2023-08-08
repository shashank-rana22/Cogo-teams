import { startCase, upperCase } from '@cogoport/utils';

const CONTAINER_COUNT = 1;

const labelMappings = {
	container_size             : (value) => (value?.includes('HC') ? value?.replace('HC', 'ft HC') : `${value}ft`),
	containers_count           : (value) => `${value} Container${value > CONTAINER_COUNT ? 's' : ''}`,
	inco_term                  : (value) => `Inco - ${upperCase(value)}`,
	cargo_weight_per_container : (value) => `${value} MT`,
	volume                     : (value) => `${value} cbm`,
	weight                     : (value) => `${value}kgs`,
};

export const renderValue = (label, value) => {
	const mappingFunction = labelMappings[label] || startCase;
	return mappingFunction(value);
};
