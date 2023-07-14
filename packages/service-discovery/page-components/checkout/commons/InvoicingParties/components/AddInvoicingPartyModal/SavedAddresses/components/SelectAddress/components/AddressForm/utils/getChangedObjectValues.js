import { isEmpty } from '@cogoport/utils';

import getValue from './getValue';

const getChangedObjectValues = ({ values, previousValues }) => {
	const newValues = {};
	Object.entries(values || {}).forEach(([key, value]) => {
		if (['string', 'number', 'boolean'].includes(typeof value)) {
			if (value !== getValue(previousValues, key)) {
				newValues[key] = value;
			}

			return;
		}

		if (Array.isArray(value)) {
			const newArrayValues = [];
			value.forEach((valueObj, index) => {
				const newObjValues = getChangedObjectValues({
					values         : valueObj,
					previousValues : getValue(previousValues, `${key}[${index}]`, {}),
				});

				if (!isEmpty(newObjValues)) {
					newArrayValues.push(newObjValues);
				}
			});

			if (!isEmpty(newArrayValues)) {
				newValues[key] = value;
			}

			return;
		}

		const newObjectValues = getChangedObjectValues({
			values         : value,
			previousValues : getValue(previousValues, key, {}),
		});

		if (!isEmpty(newObjectValues)) {
			newValues[key] = value;
		}
	});

	return newValues;
};

export default getChangedObjectValues;
