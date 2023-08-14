import { isEmpty } from '@cogoport/utils';

const getAttachedIdData = ({ values }) => {
	if (isEmpty(values)) return undefined;

	if (Array.isArray(values)) {
		return values.map((value) => {
			const { id, name } = value;

			return `${id}_${name}`;
		});
	}

	if (typeof (values) === 'object') {
		const { id, name } = values;

		return `${id}_${name}`;
	}

	return undefined;
};

export default getAttachedIdData;
