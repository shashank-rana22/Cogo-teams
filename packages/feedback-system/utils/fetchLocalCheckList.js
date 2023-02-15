const fetchLocalCheckList = (department = 'a', work_scope = 'b') => {
	const storeKey = `${department}_${work_scope}`;

	const checkList = JSON.parse(window.localStorage.getItem('checkList')) || {};

	return checkList[storeKey];
};

export default fetchLocalCheckList;
