import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateUserCourseProgress = ({ course_id, user_id }) => {
	const [{ loading: courseProgressUpdateLoading }, trigger] = useRequest({
		url    : '/update_user_course_progress',
		method : 'POST',
	}, { manual: true });

	const updateCourseProgress = async (params) => {
		try {
			await trigger({
				params: {
					course_id,
					user_id,
					...params,
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
