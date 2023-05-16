import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useGetCourseSubModule = ({ id }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_course_sub_module',
		method : 'get',
		params : { id },
	}, { manual: false });

	const getCourseSubModule = async () => {
		try {
			await trigger({ params: { id } });
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	let finalData = data?.course_sub_module_chapters || [];

	if (isEmpty(data)) {
		finalData = [{ id: new Date().getTime(), name: '', isNew: true, course_sub_module_id: id }];
	}

	return {
		getCourseSubModule,
		finalData,
		loading,
	};
};
export default useGetCourseSubModule;
