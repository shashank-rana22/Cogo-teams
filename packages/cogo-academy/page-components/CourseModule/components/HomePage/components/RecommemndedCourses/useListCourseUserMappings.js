// import { Toast } from '@cogoport/components';
// import { useRequest } from '@cogoport/request';
// import { useCallback, useMemo, useEffect } from 'react';

// function useListCourseUserMappings({ activeTab, params, query, selected, currentCategory, page_limit, page }) {
// 	const [{ data = {}, loading }, trigger] = useRequest({
// 		url    : '/list_user_courses',
// 		method : 'GET',
// 	}, { manual: true });

// 	const fetchList = useCallback(() => {
// 		try {
// 			trigger({
// 				params: finalPayload,
// 			});
// 		} catch (error) {
// 			Toast.error(error.message);
// 		}
// 	}, [trigger, finalPayload]);

// 	useEffect(() => {
// 		if (activeTab) {
// 			fetchList();
// 		}
// 	}, [activeTab, fetchList]);

// 	return {
// 		data,
// 		loading,
// 		fetchList,
// 	};
// }

// export default useListCourseUserMappings;
