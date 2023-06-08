import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetCogoAcademyCourse = ({ id }) => {
	const [courseData, setCourseData] = useState({});

	const [{ loading: courseLoading }, trigger] = useRequest({
		url    : '/get_cogo_academy_course',
		method : 'GET',
		params : { id },
	}, { manual: false });

	const getCourse = useCallback(async () => {
		try {
			const res = await trigger({ params: { id } });
			const { data = {} } = res || {};

			setCourseData(data);
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [id, trigger]);

	useEffect(() => {
		getCourse();
	}, [getCourse]);

	return {
		courseData,
		courseLoading,
	};
};

export default useGetCogoAcademyCourse;
