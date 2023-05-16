import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCourseSubModuleChapter = ({ getCourseModuleDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_course_sub_module_chapter',
		method : 'POST',
	}, { manual: true });

	const updateCourseSubModuleChapter = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCourseModuleDetails();
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
