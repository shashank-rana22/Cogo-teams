import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUserCourse = ({ course_id, user_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_user_course',
		method : 'GET',
		params : {
			course_id,
			user_id,
		},
	}, { manual: false });

	const getUserCourse = useCallback(async () => {
		try {
			await trigger({
				params: {
					course_id,
					user_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
		console.log('here');
	}, [trigger, user_id, course_id]);

	return {
		data,
		getUserCourse,
		loading,
	};
};

export default useGetUserCourse;
