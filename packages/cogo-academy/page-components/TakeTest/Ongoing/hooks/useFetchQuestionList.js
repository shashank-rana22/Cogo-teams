import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { addMinutes } from '@cogoport/utils';
import { useEffect } from 'react';

const useFetchQuestionsList = ({ currentQuestion, startTiming, duration }) => {
	const {
		profile: { user: { id:user_id = '' } },
		general: { query: { test_id = '' } },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test_question',
	}, { manual: true });

	// const test_id = '2b605b28-3cc1-47a7-b73e-52b8a2cb9f76';
	const start_time = startTiming;
	// const end_time = new Date();
	const end_time = addMinutes(start_time, duration);
	const fetchQuestions = (props = {}) => {
		const { currentQ = '' } = props || {};

		try {
			const payload = {
				test_id,
				user_id,
				question_number: currentQ || currentQuestion,
				start_time,
				end_time,
			};

			trigger({
				params: payload,
			});
		} catch (err) {
			console.log('error', err);
		}
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	return {
		loading,
		data,
		fetchQuestions,
	};
};

export default useFetchQuestionsList;
