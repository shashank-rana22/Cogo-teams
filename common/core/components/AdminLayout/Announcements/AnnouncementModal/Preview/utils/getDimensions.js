export const getWidth = ({ isMobile = false, fromFloatingWidget = false }) => {
	if (isMobile) return '330';

	if (fromFloatingWidget) return '410';

	return '366';
};

export const getHeight = ({ isMobile = false, fromFloatingWidget = false }) => {
	if (isMobile) return '186';

	if (fromFloatingWidget) return '230';

	return '206';
};
