import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useUpdateCourseFeedback = () => {
	const router = useRouter();

	const [{ loading: updateCourseFeedbackLoading }, trigger] = useRequest({

		url    : '/update_course_feedback',
		method : 'POST',
	}, { manual: true });

	const updateCourseFeedback = async ({ rating = 0, remark = '', feedback_id = '' }) => {
		try {
			await trigger({
				params: {
					id: feedback_id,
					rating,
					remark,
				},
			});

			Toast.success(
				'Feedback has been noted',
			);
			router.push('/learning/course');
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		updateCourseFeedbackLoading,
		updateCourseFeedback,
	};
};

export default useUpdateCourseFeedback;
