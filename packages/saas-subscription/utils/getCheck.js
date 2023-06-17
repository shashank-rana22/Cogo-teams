export const getCheck = ({ prev = [], item = {} }) => {
	const newValue = prev.map((x) => {
		if (item?.period === x?.period) {
			return { ...x, active: true };
		}
		return { ...x, active: false };
	});
	return newValue;
};
