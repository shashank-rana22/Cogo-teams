import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useLIstFaqAudience({ searchAudienceInput = '' }) {
	const [audienceCurrentPage, setAudienceCurrentPage] = useState(1);
	const [activeAudience, setActiveAudience] = useState('active');
	const { query, debounceQuery } = useDebounceQuery();
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchAudienceInput);
	}, [debounceQuery, searchAudienceInput]);

	const fetchFaqAudience = useCallback(async () => {
		try {
			await trigger({
				params: {
					page       : audienceCurrentPage,
					page_limit : 5,
					filters    : { q: query, status: activeAudience },
				},
			});
		} catch (err) {
			Toast?.error(err?.message);
		}
	}, [activeAudience, audienceCurrentPage, query, trigger]);

	useEffect(
		() => { fetchFaqAudience(); },
		[activeAudience, audienceCurrentPage, fetchFaqAudience, query],
	);

	return {
		fetchFaqAudience,
		data,
		loading,
		activeAudience,
		setActiveAudience,
		audienceCurrentPage,
		setAudienceCurrentPage,
	};
}

export default useLIstFaqAudience;
