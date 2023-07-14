import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useListFaqTopics({ searchTopicsInput = '' }) {
	const [topicCurrentPage, setTopicCurrentPage] = useState(1);
	const [activeTopic, setActiveTopic] = useState('active');
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchTopicsInput);
	}, [debounceQuery, searchTopicsInput]);

	const fetchFaqTopic = useCallback(() => {
		try {
			trigger({
				params: {
					page                 : !query ? topicCurrentPage : 1,
					page_limit           : 10,
					is_admin_view        : true,
					author_data_required : true,
					filters              : { q: query, status: activeTopic },
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	}, [activeTopic, query, topicCurrentPage, trigger]);

	useEffect(() => {
		fetchFaqTopic();
	}, [activeTopic, topicCurrentPage, query, fetchFaqTopic]);

	return {
		fetchFaqTopic,
		data,
		loading,
		activeTopic,
		setActiveTopic,
		topicCurrentPage,
		setTopicCurrentPage,
	};
}

export default useListFaqTopics;
