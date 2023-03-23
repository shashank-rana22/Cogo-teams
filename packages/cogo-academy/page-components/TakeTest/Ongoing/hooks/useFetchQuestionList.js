import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { addMinutes } from '@cogoport/utils';
import { useEffect } from 'react';

const useFetchQuestionsList = ({ currentQuestion }) => {
	const {
		profile: { user: { id:user_id = '' } },
		general: { query: { test_id = '' } },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test_question',
	}, { manual: true });

	// const start_time = startTiming;
	// const end_time = addMinutes(start_time, Number(duration));

	const fetchQuestions = (props = {}) => {
		const { currentQ = '' } = props || {};

		try {
			const payload = {
				test_id,
				user_id,
				question_number: currentQ || currentQuestion,
			};

			// console.log(payload, 'payload');

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
