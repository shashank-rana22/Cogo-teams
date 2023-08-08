import { startCase } from '@cogoport/utils';

const DEFAULT_CONTAINER_COUNT = 1;

const getContainerCount = (count) => {
	if (count > DEFAULT_CONTAINER_COUNT) {
		return `${startCase(count)} containers`;
	}
	return `${startCase(count)} container`;
};

export const renderValue = (label, detail = {}) => {
	const {
		weight, commodity, trade_type, source, containers_count, container_size, container_type,
		container_load_sub_type, container_load_type,
	} = detail;

	switch (label) {
		case 'trade_type':
			return startCase(trade_type || '');
		case 'commodity':
			return startCase(commodity);
		case 'weight':
			return ` ${weight} kgs`;
		case 'source':
			return source === 'direct'
				? 'Sell Without Buy'
				: startCase(source || '');
		case 'container_load_sub_type':
			return startCase(container_load_sub_type);
		case 'container_load_type':
			return startCase(container_load_type);
		case 'containers_count':
			return getContainerCount(containers_count);
		case 'container_size':
			return `${startCase(container_size)} ft`;
		case 'container_type':
			return startCase(container_type);
		default:
			return detail[label] || null;
	}
};
