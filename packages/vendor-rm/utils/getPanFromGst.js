const getPanFromGst = (value = '') => {
	const isGstin = /[0-9]/.test(value[0] || '') && value.length === 15;

	return isGstin ? value.trim().slice(2, 12) : value;
};

export default getPanFromGst;
