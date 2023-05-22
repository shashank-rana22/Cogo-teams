import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDeleteCourse = ({ fetchList, setShowModal }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const deleteCourse = async ({ values }) => {
		try {
			await trigger({ data: values });

			setShowModal(false);

			await fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteCourse,
		loading,
	};
};

export default useDeleteCourse;
