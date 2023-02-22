import { startCase } from '@cogoport/utils';

const formatArrayValues = (items, is_startcase = true) => {
	const formattedItem = items?.map((item) => (is_startcase ? startCase(item) : item));
	return formattedItem.join(', ') || '';
};

export default formatArrayValues;
