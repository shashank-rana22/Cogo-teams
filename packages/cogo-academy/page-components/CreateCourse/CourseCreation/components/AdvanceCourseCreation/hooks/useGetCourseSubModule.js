import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetCourseSubModule = ({
	id,
	getSubModuleRefetch,
	setGetSubModuleRefetch,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_course_sub_module',
		method : 'get',
		params : { id },
	}, { manual: !id });

	const getCourseSubModule = useCallback(async () => {
		try {
			await trigger({ params: { id } });
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	}, [id, trigger]);

	useEffect(() => {
		if (getSubModuleRefetch) {
			getCourseSubModule();

			setGetSubModuleRefetch(false);
		}
	}, [getCourseSubModule, getSubModuleRefetch, setGetSubModuleRefetch]);

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
