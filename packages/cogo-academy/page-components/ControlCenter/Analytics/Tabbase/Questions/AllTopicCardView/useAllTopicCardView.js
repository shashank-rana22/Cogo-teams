import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { addHours, addMinutes } from '@cogoport/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';

function useAllTopicCardView({ date = '' }) {
	const { general = {} } = useSelector((state) => state);
	const { startDate, endDate } = date;
	const { query } = general;
	const { topicId = '' } = query || {};
	const [activeTab, setActiveTab] = useState(topicId || 'All Topics');
	const [page, setPage] = useState(1);

	const [{ data, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const formatStartDate = useMemo(
		() => (startDate ? addMinutes(addHours(startDate, 5), 30) : undefined),
		[startDate],
	);

	const formatEndDate = useMemo(
		() => (endDate ? addMinutes(addHours(endDate, 5), 30) : undefined),
		[endDate],
	);

	const fetchFaqTopic = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							created_at_greater_than : formatStartDate || undefined,
							created_at_less_than    : formatEndDate || undefined,

						},
						page_limit                  : 10,
						page,
						pagination_data_required    : true,
						current_topic_data_required : true,
						sort_by                     : 'view_count',
						is_admin_view               : true,
					},
				});
			} catch (error) {
				Toast.error(error?.message);
			}
		},
		[formatStartDate, formatEndDate, page, trigger],
	);

	useEffect(() => { fetchFaqTopic(); }, [fetchFaqTopic, date, page]);
	const { page_limit, total, total_count } = data || {};
	return {
		refetchTopic: fetchFaqTopic,
		data,
		loading,
		activeTab,
		setActiveTab,
		page,
		setPage,
		page_limit,
		total,
		total_count,
	};
}

export default useAllTopicCardView;
