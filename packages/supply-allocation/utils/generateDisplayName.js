const ONE = 1;

export const getItemDisplayString = ({ count, itemType }) => {
	if (count === ONE) {
		return `${count} ${itemType}`;
	}
	return `${count} ${itemType}s`;
};
