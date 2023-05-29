import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetUserCourseDetails = ({ course_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_user_course_details',
		method : 'GET',
	}, { manual: true });

	const getUserCourseDetails = useCallback(async ({ id }) => {
		try {
			await trigger({ params: { id } });
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [trigger]);

	useEffect(() => {
		getUserCourseDetails({ id: course_id });
	}, [getUserCourseDetails, course_id]);

	return {
		dataDetails    : data,
		getUserCourseDetails,
		DetailsLoading : loading,
	};
};

export default useGetUserCourseDetails;
