import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchAudienceInput]);
	const fetchFaqAudience = async () => {
		try {
			await trigger({
				params: {
					page       : audienceCurrentPage,
					page_limit : 5,
					filters    : { q: query, status: activeAudience },
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(
		() => { fetchFaqAudience(); },
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeAudience, audienceCurrentPage, query],
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
