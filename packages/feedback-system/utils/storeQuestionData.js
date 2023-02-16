const storeQuestionData = ({ department = 'a', designation = 'b', checkList = [], weighList = [], stage = '' }) => {
	const storeKey = `${department}_${designation}`;
	const currentState = JSON.parse(window.localStorage.getItem('checkList'));
	// eslint-disable-next-line no-undef
	window.localStorage.setItem('checkList', JSON.stringify({
		...currentState,
		[storeKey]: { checkList, weighList, stage },
	}));
};

export default storeQuestionData;
