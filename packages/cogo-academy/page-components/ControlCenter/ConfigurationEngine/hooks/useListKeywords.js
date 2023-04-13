import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useListKeywords({ searchKeyWord = '', sortType }) {
	const [keywordCurrentPage, setKeywordCurrentPage] = useState(1);
	const [activeKeyword, setActiveKeyword] = useState('active');
	const { query, debounceQuery } = useDebounceQuery();
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_keywords',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchKeyWord);
	}, [searchKeyWord, debounceQuery]);

	const fetchFaqKeyword = useCallback(async () => {
		try {
			await trigger({
				params: {
					page                 : !query ? keywordCurrentPage : '1',
					page_limit           : 10,
					author_data_required : true,
					filters              : { q: query, status: activeKeyword },
					sort_type            : sortType ? 'asc' : 'desc',
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [activeKeyword, keywordCurrentPage, query, sortType, trigger]);

	useEffect(
		() => { fetchFaqKeyword(); },
		[activeKeyword,
			keywordCurrentPage,
			query,
			sortType,
			fetchFaqKeyword],
	);

	return {
		fetchFaqKeyword,
		data,
		loading,
		activeKeyword,
		setActiveKeyword,
		keywordCurrentPage,
		setKeywordCurrentPage,
	};
}

export default useListKeywords;
