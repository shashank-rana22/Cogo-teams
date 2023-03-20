import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useUpdateAnswerQuestion = () => {
	const {
		profile: { user: { id:user_id = '' } },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_user_question_answer',
	}, { manual: true });

	const test_id = '2b605b28-3cc1-47a7-b73e-52b8a2cb9f76';

	const updateAnswerList = async (id, answer, answer_state) => {
		try {
			const payload = {
				test_id,
				user_id,
				test_question_id         : id,
				test_question_answer_ids : answer,
				answer_state,
			};
			trigger({
				data: payload,
			});

			console.log('payload', payload);
		} catch (err) {
			console.log('error', err);
		}
	};

	useEffect(() => {
		updateAnswerList();
	}, []);

	return {
		loading,
		updateAnswerList,
	};
};

export default useUpdateAnswerQuestion;
