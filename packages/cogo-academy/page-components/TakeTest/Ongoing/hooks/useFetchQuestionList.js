import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useFetchQuestionsList = ({ currentQuestion }) => {
	const {
		profile: { user: { id:user_id = '' } },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test_question',
	}, { manual: true });

	const test_id = 'cec3db69-604d-48b7-a22d-cbab6c7572db';
	// const question_number = currentQuestion || 2;
	const start_time = new Date();
	const end_time = new Date();

	const fetchQuestions = () => {
		try {
			const payload = {
				test_id,
				user_id,
				question_number: currentQuestion,
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
	}, [currentQuestion]);

	return {
		loading,
		data,
		fetchQuestions,
	};
};

export default useFetchQuestionsList;
