import { useState } from 'react';

const useQuestionList = () => {
	const [questionList, setQuestionList] = useState('added_questions');
	const [searchInput, setSearchInput] = useState('');

	return {
		questionList,
		setQuestionList,
		searchInput,
		setSearchInput,
	};
};

export default useQuestionList;
