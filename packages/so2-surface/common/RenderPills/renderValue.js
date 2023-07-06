import { startCase } from '@cogoport/utils';

const DEFAULT_CONTAINER_COUNT = 1;

export const renderValue = (label, detail = {}) => {
	const {
		weight, commodity, trade_type, source, containers_count, container_size, container_type,
		container_load_sub_type, container_load_type,
	} = detail;

	const commodityDetails = () => (
		<div>
			{startCase(commodity)}
		</div>
	);

	const getContainerCount = (count) => {
		if (count > DEFAULT_CONTAINER_COUNT) {
			return `${startCase(containers_count)} containers`;
		}
		return `${startCase(containers_count)} container`;
	};

	switch (label) {
		case 'trade_type':
			return startCase(trade_type || '');
		case 'commodity':
			return commodityDetails();
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
