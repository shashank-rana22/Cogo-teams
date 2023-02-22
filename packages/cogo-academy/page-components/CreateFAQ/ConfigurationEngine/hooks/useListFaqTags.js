import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTags() {
	const [tagCurrentPage, setTagCurrentPage] = useState(1);
	const [activeTag, setActiveTag] = useState('active');
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				data: { page: tagCurrentPage, status: activeTag },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, [activeTag]);

	return { fetchFaqTag, data, loading, activeTag, setActiveTag, tagCurrentPage, setTagCurrentPage };
}

export default useListFaqTags;
