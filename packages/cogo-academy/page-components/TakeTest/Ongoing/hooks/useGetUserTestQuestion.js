import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetUserTestQuestion({ currentQuestionId, page }) {
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
			...(currentQuestionId && currentQuestionId !== 'undefined' && page
				? { question_id: currentQuestionId } : {}),
			...((!currentQuestionId && currentQuestionId === 'undefined')
				? { first_question_required: true } : {}),

		},
	}, { manual: false });

	const getUserTestQuestion = ({ question_id }) => {
		try {
			trigger({
				params: {
					test_id,
					user_id,
					question_id,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	};

	const {
		start_time,
		question_data,
		test_user_mapping_id,
		total_question_count,
		user_appearance,
	} = data || {};

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
