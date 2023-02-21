const storeQuestionData = ({ department = 'a', designation = 'b', checkList = [], stage = '' }) => {
	const storeKey = `${department}_${designation}`;
	// eslint-disable-next-line no-undef
	const currentState = JSON.parse(localStorage.getItem('checkList'));
	// eslint-disable-next-line no-undef
	localStorage.setItem('checkList', JSON.stringify({
		...currentState,
		[storeKey]: { checkList, stage },
	}));
};

export default storeQuestionData;
