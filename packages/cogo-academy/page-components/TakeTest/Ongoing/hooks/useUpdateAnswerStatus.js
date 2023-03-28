import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateAnswerQuestion = () => {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_user_question_answer',
	}, { manual: true });

	const updateAnswerList = async (id, answer, answer_state) => {
		try {
			const payload = {
				test_id,
				user_id,
				test_question_id         : id,
				test_question_answer_ids : answer,
				answer_state,
			};

			await trigger({
				data: payload,
			});
		} catch (err) {
			console.log('error', err);
		}
	};

	return {
		loading,
		updateAnswerList,
	};
};

export default useUpdateAnswerQuestion;
