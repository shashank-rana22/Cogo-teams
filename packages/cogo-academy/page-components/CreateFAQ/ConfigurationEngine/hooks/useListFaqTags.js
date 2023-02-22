import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTags({ searchTagsInput = '' }) {
	const [tagCurrentPage, setTagCurrentPage] = useState(1);
	const [activeTag, setActiveTag] = useState('active');
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				params: {
					page       : tagCurrentPage,
					status     : activeTag,
					page_limit : 5,
					filters    : { q: searchTagsInput },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, [activeTag, tagCurrentPage, searchTagsInput]);

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
