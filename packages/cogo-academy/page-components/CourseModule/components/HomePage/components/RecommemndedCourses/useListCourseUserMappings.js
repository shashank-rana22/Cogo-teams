import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListCourseUserMappings({ user_id, ongoingCategories }) {
	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_user_courses',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						status             : 'active',
						user_id,
						course_category_id : ongoingCategories.data,
						course_state       : 'published',
					},
				},
			});
		} catch (error) {
			Toast.error(error.message);
		}
	}, [ongoingCategories.data, trigger, user_id]);

	useEffect(() => {
		if (ongoingCategories.loaded) {
			fetchList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ongoingCategories.loaded]);

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
