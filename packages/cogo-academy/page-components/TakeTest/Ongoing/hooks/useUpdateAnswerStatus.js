import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateAnswerQuestion = ({ test_user_mapping_id }) => {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_user_question_response',
	}, { manual: true });

	const updateAnswerList = async ({
		data,
		answerArray,
		answerState,
		subQuestion,
	}) => {
		const { id = '', sub_questions = [], question_type } = data || {};

		try {
			const payload = {
				test_id,
				user_id,
				test_user_mapping_id,
				test_user_responses: [
					{
						test_question_id         : id,
						test_question_answer_ids : answerArray,
						answer_state             : answerState,
						...(question_type === 'case_study'
							? { test_case_study_question_id: sub_questions?.[subQuestion - 1]?.id } : null),
					},
				],

			};

			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		loading,
		updateAnswerList,
	};
};

export default useUpdateAnswerQuestion;
