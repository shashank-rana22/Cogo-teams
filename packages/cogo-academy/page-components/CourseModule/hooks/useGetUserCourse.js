import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetUserCourse = ({ course_id, user_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_user_course',
		method : 'GET',
	}, { manual: true });

	const getUserCourse = useCallback(async ({ id }) => {
		try {
			await trigger({
				params: {
					course_id: id,
					user_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [trigger, user_id]);

	useEffect(() => {
		getUserCourse({ id: course_id });
	}, [course_id, getUserCourse]);

	return {
		data,
		getUserCourse,
		loading,
	};
};

export default useGetUserCourse;
