import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useFetchQuestionsList = ({ currentQuestion }) => {
	const {
		profile: { user: { id:user_id = '' } },
		general: { query: { test_id = '' } },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test_question',
	}, { manual: true });

	const fetchQuestions = useCallback((props = {}) => {
		const { currentQ = '' } = props || {};

		try {
			const payload = {
				test_id,
				user_id,
				question_number: currentQ || currentQuestion,
			};

			trigger({
				params: payload,
			});
		} catch (err) {
			console.log('error', err);
		}
	}, [currentQuestion, test_id, trigger, user_id]);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	return {
		loading,
		data,
		fetchQuestions,
	};
};

export default useFetchQuestionsList;
