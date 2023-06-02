import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCourseFeedback = () => {
	const [{ loading }, trigger] = useRequest({

		url    : '/create_course_feedback',
		method : 'POST',
	}, { manual: true });

	const createCourseFeedback = async ({ rating, remark }) => {
		try {
			await trigger({
				params: {
					cogo_academy_course_id: '',
					rating,
					remark,
				},
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		loading,
		createCourseFeedback,
	};
};

export default useCreateCourseFeedback;
