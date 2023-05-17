import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCourseSubModuleSequenceOrder = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_course_sub_module_sequence_order',
		method : 'POST',
	}, { manual: true });

	const updateCourseSubModuleSequenceOrder = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateCourseSubModuleSequenceOrder,
		loading,
	};
};

export default useUpdateCourseSubModuleSequenceOrder;
