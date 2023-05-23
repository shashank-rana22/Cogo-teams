import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useMemo, useEffect } from 'react';

function useListCourseUserMappings({ activeTab, params }) {
	const finalPayload = useMemo(() => ({
		...params,
		filters: {
			...params.filters,
			// ...MAPPING[activeTab],
		},
	}), [params]);

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_user_courses',
		method : 'GET',
		params : finalPayload,
	}, { manual: false });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: finalPayload,
			});
		} catch (error) {
			Toast.error(error.message);
		}
	}, [trigger, finalPayload]);

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
