import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCourseModule = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_course_module',
		method : 'POST',
	}, { manual: true });

	const createCourseModule = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCourseModule,
		loading,
	};
};

export default useCreateCourseModule;
