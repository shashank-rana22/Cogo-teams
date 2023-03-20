import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

function useAllAudience() {
	const { general = {} } = useSelector((state) => state);
	const [page, setPage] = useState(1);

	const { query } = general;

	const { topicId = '' } = query || {};
	const [activeTab, setActiveTab] = useState(topicId || 'All Topics');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
	}, { manual: true });

	const fetchFaqTopic = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page,
						page_limit                       : 10 || undefined,
						pagination_data_required         : true,
						most_viewed_questions_required   : true,
						audience_wise_questions_required : true,
						audience_wise_stats_required     : true,
						audience_wise_topics_required    : true,
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[page, trigger],
	);

	useEffect(() => { fetchFaqTopic(); }, [page, fetchFaqTopic]);

	return {
		refetchTopic: fetchFaqTopic,
		setPage,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useAllAudience;
