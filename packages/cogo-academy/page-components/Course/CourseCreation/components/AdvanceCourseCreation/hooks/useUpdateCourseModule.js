import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCourseModule = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_course_module',
		method : 'POST',
	}, { manual: true });

	const updateCourseModule = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateCourseModule,
		loading,
	};
};

export default useUpdateCourseModule;
