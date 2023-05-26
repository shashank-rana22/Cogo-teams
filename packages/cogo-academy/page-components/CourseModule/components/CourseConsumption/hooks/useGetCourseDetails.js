import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const useGetCourseDetails = ({ id }) => {
	const [finalData, setFinalData] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_course_details',
		method : 'get',
		params : { id },
	}, { manual: false });

	const getCourseDetails = useCallback(async () => {
		try {
			const res = await trigger({ params: { id } });
			const { data = {} } = res || {};
			setFinalData(data);
		} catch (error) {
			// if (error.response?.data) {
			// 	Toast.error(getApiErrorString(error.response?.data));
			// }
		}
	}, [id, trigger]);

	useEffect(() => {
		getCourseDetails();
	}, [getCourseDetails]);

	return {
		loading,
		finalData,
	};
};

export default useGetCourseDetails;
