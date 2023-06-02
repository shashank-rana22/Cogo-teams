import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useMemo, useEffect } from 'react';

const MAPPING = {
	ongoing   : { state: 'ongoing' },
	mandatory : { is_mandatory: true },
	completed : { state: 'completed' },
	saved     : { is_saved: true },
};

function useListCourseUserMappings({ activeTab, inputValue, selected, currentCategory, page_limit, page, user_id }) {
	const finalPayload = useMemo(() => ({
		page    : page || 1,
		filters : {
			status: 'active',
			user_id,
			...MAPPING[activeTab],
			course_category_id:
			(currentCategory === 'all_courses' || currentCategory === undefined) ? null : [`${currentCategory}`],
			faq_topic_id : selected === '' ? null : selected,
			q            : inputValue,
		},
		page_limit: page_limit || 10000000000000,
	}), [page, user_id, activeTab, currentCategory, selected, inputValue, page_limit]);

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
		if (activeTab) {
			fetchList();
		}
	}, [activeTab, fetchList]);

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
