import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListCourseUserMappings({ user_id, ongoingCategories, inputValue }) {
	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_user_courses',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						staus              : 'active',
						user_id,
						course_category_id : ongoingCategories.data,
						q                  : inputValue,
					},
				},
			});
		} catch (error) {
			Toast.error(error.message);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ongoingCategories.data, trigger, user_id]);

	useEffect(() => {
		if (ongoingCategories.loaded) {
			fetchList();
		}
	}, [fetchList, ongoingCategories.loaded]);

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
