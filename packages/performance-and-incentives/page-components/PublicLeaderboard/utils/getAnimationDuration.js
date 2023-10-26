const getAnimationDuration = ({ listLength = 0 }) => {
	if (listLength <= 10) {
		return '8s';
	} if (listLength <= 20) {
		return '18s';
	} if (listLength <= 40) {
		return '28s';
	} if (listLength > 40) {
		return '35s';
	}
	return '50s';
};

export default getAnimationDuration;
