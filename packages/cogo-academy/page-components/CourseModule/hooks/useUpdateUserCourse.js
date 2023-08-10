import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateUserCourse = ({ fetchList }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_user_course',
		method : 'POST',
	}, { manual: true });

	const updateUserCourse = useCallback(async ({ course_user_mapping_id, saved }) => {
		try {
			await trigger({
				params: {
					course_user_mapping_id,
					is_saved: !saved,
				},
			});

			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [fetchList, trigger]);

	return {
		updateUserCourse,
		loading,
	};
};

export default useUpdateUserCourse;
