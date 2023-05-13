import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getPayload from './Header/utils/getPayload';

const useUpdateCourse = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const updateCourse = async ({ activeTab, values, id }) => {
		try {
			await trigger({ data: getPayload({ activeTab, values, id }) });
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateCourse,
		loading,
	};
};

export default useUpdateCourse;
