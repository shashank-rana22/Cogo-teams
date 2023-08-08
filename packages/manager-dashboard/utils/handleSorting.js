const SORT_ASC = -1;
const SORT_DESC = 1;
const DEFAULT_SORT_VALUE = 0;

export const handleSorting = ({ sorting, setSortedData, sortedData }) => {
	const { sortBy, sortOrder } = sorting || {};
	const sortedArr = [...sortedData].sort((a, b) => {
		const valueA = a[sortBy];
		const valueB = b[sortBy];

		if (valueA < valueB) {
			return sortOrder === 'asc' ? SORT_ASC : SORT_DESC;
		} if (valueA > valueB) {
			return sortOrder === 'asc' ? SORT_DESC : SORT_ASC;
		}
		return DEFAULT_SORT_VALUE;
	});

	setSortedData(sortedArr);
};
