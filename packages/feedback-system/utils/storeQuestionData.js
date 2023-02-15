const storeQuestionData = ({ department = 'a', work_scope = 'b', checkList }) => {
	const storeKey = `${department}_${work_scope}`;
	const currentState = JSON.parse(window.localStorage.getItem('checkList'));
	// eslint-disable-next-line no-undef
	window.localStorage.setItem('checkList', JSON.stringify({
		...currentState,
		[storeKey]: checkList,
	}));
};

export default storeQuestionData;
