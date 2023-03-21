import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

function useAllAudience({ date = '' }) {
	const { general = {} } = useSelector((state) => state);
	const [page, setPage] = useState(1);
	const { startDate, endDate } = date;

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
						filters: {
							created_at_greater_than : startDate || undefined,
							created_at_less_than    : endDate || undefined,

						},
						page,
						page_limit                     : 10 || undefined,
						pagination_data_required       : true,
						current_audience_data_required : true,
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[endDate, page, startDate, trigger],
	);

	useEffect(() => {
		fetchFaqTopic();
	}, [page, fetchFaqTopic, startDate, endDate]);

	const { page_limit = 0, total_count = 0 } = data || {};

	return {
		refetchTopic: fetchFaqTopic,
		page,
		setPage,
		page_limit,
		total_count,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useAllAudience;
