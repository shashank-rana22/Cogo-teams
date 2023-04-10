import {
	getByKey, format, isEmpty, startCase,
} from '@cogoport/utils';

const getValue = (
	itemData,
	itemField,
) => {
	if (isEmpty(itemData) || isEmpty(itemField)) return '';

	const val = getByKey(itemData, itemField.key);

	switch (itemField.type) {
		case 'datetime': {
			if (val) return format(val, itemField.formatType || 'dd MMM yy | hh:mm a');
			return <div className="core-date-dash">-</div>;
		}

		default:
			break;
	}
	return val === null || val === undefined ? '-' : startCase(val);
};

export default getValue;
