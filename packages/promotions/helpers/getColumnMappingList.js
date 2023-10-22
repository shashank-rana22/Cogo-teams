const columnsWithValue = ({ data = {}, list = [] }) => {
	const NEW_MAPPING_LIST = list?.map((columnDetails) => {
		const { getValue = () => {} } = columnDetails || {};
		const value = getValue(data);

		return {
			...(columnDetails || {}),
			value,
		};
	});

	return NEW_MAPPING_LIST || [];
};

export default columnsWithValue;
