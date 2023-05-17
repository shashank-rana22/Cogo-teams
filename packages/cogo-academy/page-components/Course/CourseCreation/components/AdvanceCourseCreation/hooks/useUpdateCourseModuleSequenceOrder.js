import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCourseModuleSequenceOrder = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_course_module_sequence_order',
		method : 'POST',
	}, { manual: true });

	const updateCourseModuleSequenceOrder = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateCourseModuleSequenceOrder,
		loading,
	};
};

export default useUpdateCourseModuleSequenceOrder;
