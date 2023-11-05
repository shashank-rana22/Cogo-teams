function calcChange({ currVal = 0, prevVal = 0 }) {
	if (prevVal === 0) {
		return 'initial';
	}

	return (((currVal - prevVal) / prevVal) * 100).toFixed(2) || 0;
}

export default calcChange;
