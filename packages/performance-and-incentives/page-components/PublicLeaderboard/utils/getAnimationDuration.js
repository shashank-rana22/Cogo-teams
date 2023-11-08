const getAnimationDuration = ({ listLength = 0 }) => {
	if (listLength <= 10) {
		return '8s';
	} if (listLength <= 20) {
		return '18s';
	} if (listLength <= 40) {
		return '30s';
	}
	return '40s';
};

export default getAnimationDuration;
