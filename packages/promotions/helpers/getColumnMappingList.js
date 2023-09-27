const columnsWithValue = ({ data = {}, list = [] }) => {
	const NEW_MAPPING_LIST = [];
	list.forEach((columnDetails) => {
		const { getValue = () => {} } = columnDetails || {};

		const value = getValue(data);

		NEW_MAPPING_LIST.push({
			...(columnDetails || {}),
			value,
		});
	});

	return NEW_MAPPING_LIST;
};

export default columnsWithValue;
