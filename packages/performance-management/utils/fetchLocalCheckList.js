const fetchLocalCheckList = (department = 'a', designation = 'b') => {
	const storeKey = `${department}_${designation}`;

	const checkList = JSON.parse(localStorage.getItem('checkList')) || {};

	return checkList[storeKey] || checkList;
};

export default fetchLocalCheckList;
