const getAnimationDuration = ({ listLength = 0 }) => {
	if (listLength <= 10) {
		return '8s';
	} if (listLength <= 20) {
		return '18s';
	} if (listLength <= 40) {
		return '28s';
	}
	return '35s';
};

export default getAnimationDuration;
