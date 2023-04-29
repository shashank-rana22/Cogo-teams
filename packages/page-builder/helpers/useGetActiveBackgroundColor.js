const useGetActiveBackgroundColor = ({ pageConfiguration, isActive, canDrop }) => {
	let backgroundColor = pageConfiguration.style['background-color'] || '#f9f9f9';

	if (isActive) {
		backgroundColor = 'grey';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}

	return backgroundColor;
};

export default useGetActiveBackgroundColor;
