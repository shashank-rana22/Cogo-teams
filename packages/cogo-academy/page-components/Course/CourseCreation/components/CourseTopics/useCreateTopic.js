import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateTopic = ({ setShow }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_course_category',
		method : 'POST',
	}, { manual: true });

	const createCategory = async ({ values }) => {
		try {
			await trigger({ data: values });

			setShow(false);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCategory,
		loading,
	};
};

export default useCreateTopic;
