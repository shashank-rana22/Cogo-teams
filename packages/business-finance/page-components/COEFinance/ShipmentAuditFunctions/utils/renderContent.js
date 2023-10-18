import { startCase } from '@cogoport/utils';

const renderItem = (item = '') => {
	if (typeof item === 'string') {
		return startCase(item);
	}
	return item;
};

export default renderItem;
