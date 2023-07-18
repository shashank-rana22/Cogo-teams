import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const getSeparatedIdData = ({ values }) => {
	if (isEmpty(values)) return undefined;

	if (Array.isArray(values)) {
		return values.map((value) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]);
	}

	if (typeof (values) === 'object') {
		const SEPARATED_VALUES = {};

		Object.entries(values).forEach(([key, valueItem]) => {
			if (Array.isArray(valueItem)) {
				SEPARATED_VALUES[key] = valueItem.map(
					(singleValue) => singleValue.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
				);
			} else {
				SEPARATED_VALUES[key] = valueItem;
			}
		});

		return SEPARATED_VALUES;
	}

	return undefined;
};

export default getSeparatedIdData;
