import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetUserTestQuestion({ currentQuestionId }) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_user_test_question',
		params : {
			test_id,
			user_id,
			question_id: currentQuestionId,
		},
	}, { manual: false });

	const getUserTestQuestion = async ({ question_id }) => {
		await trigger({
			params: {
				test_id,
				user_id,
				question_id,
			},
		});
	};

	const { start_time, question_data, test_user_mapping_id, total_question_count, user_appearance } = data || {};

	const { id } = question_data || {};

	localStorage.setItem(`current_question_id_${test_id}_${user_id}`, id);

	return {
		getUserTestQuestion,
		loading,
		start_time,
		question_data,
		test_user_mapping_id,
		total_question_count,
		user_appearance,
	};
}

export default useGetUserTestQuestion;
