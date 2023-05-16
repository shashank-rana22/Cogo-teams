import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCourseSubModuleChapter = ({ getCourseSubModule }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_course_sub_module_chapter',
		method : 'POST',
	}, { manual: true });

	const updateCourseSubModuleChapter = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseSubModule();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateCourseSubModuleChapter,
		loading,
	};
};

export default useUpdateCourseSubModuleChapter;
