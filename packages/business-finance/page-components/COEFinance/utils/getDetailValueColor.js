export const getDetailValueColor = ({
	detectKey = '',
	value = '', docContent = {},
}) => {
	const detectValue = docContent[detectKey];
	if (detectValue?.includes(value)) {
		return '#439c52'; // green
	}
	return 'auto';
};
