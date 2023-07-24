const storeQuestionData = ({
	department = '', designation = '',
	checkList = [], stage = '', bulkDesignations = [],
}) => {
	const designationKey = `${department}_${designation}`;

	const currentState = JSON.parse(localStorage.getItem('checkList'));

	localStorage.setItem('checkList', JSON.stringify({
		...currentState,
		[designationKey]: { checkList, stage, bulkDesignations },
	}));
};

export default storeQuestionData;
