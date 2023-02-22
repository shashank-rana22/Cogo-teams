import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useListFaqTags() {
	const [tagCurrentPage, setTagCurrentPage] = useState(1);
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				data: { page: tagCurrentPage },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, []);

	return { fetchFaqTag, data, loading, tagCurrentPage, setTagCurrentPage };
}

export default useListFaqTags;
