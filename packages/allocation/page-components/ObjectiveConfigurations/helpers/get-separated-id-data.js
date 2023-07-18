import { isEmpty } from '@cogoport/utils';

const getSeparatedIdData = ({ values }) => {
	if (isEmpty(values)) return undefined;

	if (Array.isArray(values)) {
		return values.map((value) => {
			const [id, name] = value.split('_');

			return { id, name };
		});
	}

	if (typeof (values) === 'object') {
		const SEPARATED_VALUES = {};

		Object.entries(values).forEach(([key, valueItem]) => {
			if (Array.isArray(valueItem)) {
				SEPARATED_VALUES[key] = valueItem.map(
					(singleValue) => {
						const [id, name] = singleValue.split('_');

						return { id, name };
					},
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
