const getExternalPocData = (data = []) => {
	const format_data = { import: [], export: [] };

	data.map((item) => format_data?.[item?.trade_type].push(item));

	return format_data;
};

export default getExternalPocData;
