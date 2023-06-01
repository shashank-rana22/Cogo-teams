import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useMemo, useEffect } from 'react';

const MAPPING = {
	ongoing   : { state: 'ongoing' },
	mandatory : { is_mandatory: true },
	completed : { state: 'completed' },
	saved     : { is_saved: true },
};

function useListCourseUserMappings({ activeTab, params, query, selected, currentCategory }) {
	const finalPayload = useMemo(() => ({
		...params,
		filters: {
			...params.filters,
			...MAPPING[activeTab],
			course_category_id:
			(currentCategory === 'all_courses' || currentCategory === undefined) ? null : [`${currentCategory}`],
			faq_topic_id : selected === '' ? null : selected,
			q            : query,
		},
	}), [params, query, activeTab, currentCategory, selected]);

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

	useEffect(() => {
		fetchList();
	}, [activeTab, fetchList]);

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
