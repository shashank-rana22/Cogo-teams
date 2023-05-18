import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CURRENT_TO_NEXT_MAPPING from '../components/RightComponent/Header/CURRENT_TO_NEXT_MAPPING';

const useUpdateCourse = ({ setActiveTab, activeTab, getCogoAcademyCourse }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const updateCourse = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCogoAcademyCourse();

			if (activeTab !== 'publish') {
				setActiveTab(CURRENT_TO_NEXT_MAPPING[activeTab]);
			}
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
