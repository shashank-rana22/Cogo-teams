import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetCourseModuleDetails = ({ id, setFinalData, activeTab, showButtons }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_course_details',
		method : 'get',
		params : { id },
	}, { manual: true });

	const getCourseModuleDetails = useCallback(async () => {
		try {
			const res = await trigger({ params: { id } });

			const { data } = res || {};

			if (showButtons && (!data || isEmpty(data))) {
				setFinalData([{ id: new Date().getTime(), name: '', course_sub_modules: [], isNew: true }]);
			} else {
				setFinalData(data);
			}
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [id, setFinalData, showButtons, trigger]);

	useEffect(() => {
		if (activeTab === 'curriculum') {
			getCourseModuleDetails();
		}
	}, [activeTab, getCourseModuleDetails]);

	return {
		getCourseModuleDetails,
		loading,
	};
};

export default useGetCourseModuleDetails;
