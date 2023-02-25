import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useLIstFaqAudience({ searchAudienceInput = '' }) {
	const [audienceCurrentPage, setAudienceCurrentPage] = useState(1);
	const [activeAudience, setActiveAudience] = useState('active');
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
	}, { manual: true });

	const fetchFaqAudience = async () => {
		try {
			await trigger({
				params: {
					page       : audienceCurrentPage,
					page_limit : 5,
					filters    : { q: searchAudienceInput, status: activeAudience },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(
		() => { fetchFaqAudience(); },
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeAudience, setAudienceCurrentPage, searchAudienceInput],
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
