import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUserCourse = ({ course_id, user_id, viewType }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_user_course',
		method : 'GET',
		params : {
			course_id,
			user_id,
		},
	}, { manual: viewType === 'preview' });

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
	}, [trigger, user_id, course_id]);

	return {
		data,
		getUserCourse,
		loading,
	};
};

export default useGetUserCourse;
