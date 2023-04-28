import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useListFaqTags({ searchTagsInput = '' }) {
	const [tagCurrentPage, setTagCurrentPage] = useState(1);
	const [activeTag, setActiveTag] = useState('active');
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchTagsInput);
	}, [debounceQuery, searchTagsInput]);

	const fetchFaqTag = useCallback(() => {
		try {
			trigger({
				params: {
					page                 : !query ? tagCurrentPage : '1',
					page_limit           : 10,
					author_data_required : true,
					filters              : { q: query, status: activeTag },
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	}, [activeTag, query, tagCurrentPage, trigger]);

	useEffect(() => {
		fetchFaqTag();
	}, [activeTag, tagCurrentPage, query, fetchFaqTag]);

	return {
		fetchFaqTag,
		data,
		loading,
		activeTag,
		setActiveTag,
		tagCurrentPage,
		setTagCurrentPage,
	};
}

export default useListFaqTags;
