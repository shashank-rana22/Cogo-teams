import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
					page       : !query ? audienceCurrentPage : '1',
					page_limit : 10,
					filters    : { q: query, status: activeAudience },
				},
			});
		} catch (err) {
			if (err.response?.data) { Toast.error(getApiErrorString(err.response?.data)); }
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
