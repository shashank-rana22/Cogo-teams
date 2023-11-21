import { startCase } from '@cogoport/utils';

const getLabel = (label, value) => {
	switch (label) {
		case 'container_size':
			if (value.includes('HC')) {
				return value?.replace('HC', ' ft HC');
			}
			return `${value || '--'}ft`;
		default:
			return startCase(value || '');
	}
};

const renderLabel = (option) => {
	const containerType = getLabel('', option?.container_type);
	const commodity = getLabel('', option?.commodity);
	const containerSize = getLabel('container_size', option?.container_size);

	return `${containerSize} (${containerType}) (${commodity})`;
};

export default renderLabel;
