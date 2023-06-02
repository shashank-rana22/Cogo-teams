import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateUserCourseProgress = ({ course_id, user_id }) => {
	const [{ loading: courseProgressUpdateLoading }, trigger] = useRequest({

		url    : '/update_user_course_progress',
		method : 'POST',
	}, { manual: true });

	const updateCourseProgress = async ({ current_chapter_id, next_chapter_state, next_chapter_id }) => {
		try {
			await trigger({
				params: {
					course_id,
					user_id,
					next_chapter_state,
					current_chapter_id,
					next_chapter_id,
				},
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		courseProgressUpdateLoading,
		updateCourseProgress,
	};
};

export default useUpdateUserCourseProgress;
