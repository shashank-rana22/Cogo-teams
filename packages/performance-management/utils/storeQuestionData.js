const storeQuestionData = ({
	department = '', designation = '',
	checkList = [], stage = '', bulkDesignations = [],
}) => {
	const designationKey = `${department}_${designation}`;
	// eslint-disable-next-line no-undef
	const currentState = JSON.parse(localStorage.getItem('checkList'));
	// eslint-disable-next-line no-undef
	localStorage.setItem('checkList', JSON.stringify({
		...currentState,
		[designationKey]: { checkList, stage, bulkDesignations },
	}));
};

export default storeQuestionData;
