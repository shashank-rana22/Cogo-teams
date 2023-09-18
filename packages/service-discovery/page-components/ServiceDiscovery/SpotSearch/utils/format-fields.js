const formatFields = (fields, activeStat) => {
	if (activeStat.toOmit) {
		return fields.filter((item) => !activeStat.toOmit.includes(item.key));
	}
	return fields;
};
export default formatFields;
