import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useListQuestions = () => {
	const [activeTab, setActiveTab] = useState('stand_alone_questions');

	const [params, setParams] = useState({});

	const [searchQuestion, setSearchQuestion] = useState('');

	const { debounceQuery, query } = useDebounceQuery();

	const QUESTIONS_MAPPING = {
		stand_alone_questions: {
			payload: {
				filters: { q: query, question_type: ['single_correct', 'multi_correct'] },
				...params,
			},
			title: 'Stand Alone Questions',
		},
		case_study_based: {
			payload: {
				filters: { question_type: 'case_study', q: query },
				...params,
			},
			title: 'Case Study Based',
		},
	};

	const { payload } = QUESTIONS_MAPPING[activeTab];

	const [{ data, loading }, refetch] = useRequest({
		method : 'GET',
		url    : '/list_test_questions',
		params : { ...payload },
	}, { manual: false });

	return {
		data,
		loading,
		refetch,
		activeTab,
		debounceQuery,
		setActiveTab,
		searchQuestion,
		setSearchQuestion,
		params,
		setParams,
		QUESTIONS_MAPPING,
	};
};
export default useListQuestions;
