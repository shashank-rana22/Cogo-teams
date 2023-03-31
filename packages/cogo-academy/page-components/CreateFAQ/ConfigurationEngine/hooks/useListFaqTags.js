import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTagsInput]);

	const fetchFaqTag = async () => {
		try {
			await trigger({
				params: {
					page                 : tagCurrentPage,
					page_limit           : 5,
					author_data_required : true,
					filters              : { q: query, status: activeTag },
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, [activeTag, tagCurrentPage, query]);

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
