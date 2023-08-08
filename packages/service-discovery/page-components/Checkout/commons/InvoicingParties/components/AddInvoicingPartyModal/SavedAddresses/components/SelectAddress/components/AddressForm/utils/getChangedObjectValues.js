import { isEmpty } from '@cogoport/utils';

import getValue from './getValue';

const getChangedObjectValues = ({ values, previousValues }) => {
	const VALUES = {};
	Object.entries(values || {}).forEach(([key, value]) => {
		if (['string', 'number', 'boolean'].includes(typeof value)) {
			if (value !== getValue(previousValues, key)) {
				VALUES[key] = value;
			}

			return;
		}

		if (Array.isArray(value)) {
			const ARRAY_VALUES = [];
			value.forEach((valueObj, index) => {
				const newObjValues = getChangedObjectValues({
					values         : valueObj,
					previousValues : getValue(previousValues, `${key}[${index}]`, {}),
				});

				if (!isEmpty(newObjValues)) {
					ARRAY_VALUES.push(newObjValues);
				}
			});

			if (!isEmpty(ARRAY_VALUES)) {
				VALUES[key] = value;
			}

			return;
		}

		const newObjectValues = getChangedObjectValues({
			values         : value,
			previousValues : getValue(previousValues, key, {}),
		});

		if (!isEmpty(newObjectValues)) {
			VALUES[key] = value;
		}
	});

	return VALUES;
};

export default getChangedObjectValues;
