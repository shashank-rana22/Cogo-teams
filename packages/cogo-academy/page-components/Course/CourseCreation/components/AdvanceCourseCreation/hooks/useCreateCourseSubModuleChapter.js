import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCourseSubModuleChapter = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_course_sub_module_chapter',
		method : 'POST',
	}, { manual: true });

	const createCourseSubModuleChapter = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCourseSubModuleChapter,
		loading,
	};
};

export default useCreateCourseSubModuleChapter;
