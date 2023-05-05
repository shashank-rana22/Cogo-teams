const useGetActiveBackgroundColor = ({ pageConfiguration, isActive, canDrop, modeType }) => {
	let backgroundColor = pageConfiguration.style['background-color'] || '#f9f9f9';

	if (modeType === 'edit') {
		if (isActive) {
			backgroundColor = '#808080';
		} else if (canDrop) {
			backgroundColor = '#bdb76b';
		}
	}

	return backgroundColor;
};

export default useGetActiveBackgroundColor;
