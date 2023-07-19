const getValue = (object, path, defaultValue) => {
	const value = object?.[path];

	return !value ? defaultValue : value;
};

export default getValue;
