import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCourseSubModule = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_course_sub_module',
		method : 'POST',
	}, { manual: true });

	const createCourseSubModule = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCourseSubModule,
		loading,
	};
};

export default useCreateCourseSubModule;
