import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import CURRENT_TO_NEXT_MAPPING from '../components/RightComponent/Header/CURRENT_TO_NEXT_MAPPING';

const useUpdateCourse = ({
	data,
	setActiveTab,
	activeTab,
	getCogoAcademyCourse,
	changeTab = true,
	setPublishData = () => {},
}) => {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const updateCourse = async ({
		values = {},
		isRefetchRequired = true,
		buttonType = 'save',
	}) => {
		try {
			let finalValues = values;

			if (activeTab === 'audience') {
				const audiences = values?.audiences?.map((audience) => audience.id);
				const inactive_audience_ids = data?.course_audience_mappings
					?.map((audience) => audience.faq_audience_id)
					?.filter((id) => !audiences.includes(id));

				finalValues = { ...values, inactive_audience_ids };
			}

			await trigger({ data: finalValues });

			if (isRefetchRequired) {
				await getCogoAcademyCourse();
			}

			if (activeTab !== 'pre_publish' && changeTab) {
				setActiveTab(CURRENT_TO_NEXT_MAPPING[activeTab]);
			}

			if (buttonType === 'publish') {
				setPublishData({});

				router.push(
					'/learning?activeTab=course_module',
					'/learning?activeTab=course_module',
				);
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
