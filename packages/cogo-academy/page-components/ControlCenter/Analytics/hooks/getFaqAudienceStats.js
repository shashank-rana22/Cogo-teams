import { useRequest } from '@cogoport/request';
import { addHours, addMinutes } from '@cogoport/utils';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

function useFaqAudiencesStats() {
	const dataFetchedRef = useRef(false);
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const [date, setDate] = useState({});

	const { startDate = '', endDate = '' } = date;

	const formatStartDate = useMemo(
		() => (startDate ? addMinutes(addHours(startDate, 5), 30) : undefined),
		[startDate],
	);

	const formatEndDate = useMemo(
		() => (endDate ? addMinutes(addHours(endDate, 5), 30) : undefined),
		[endDate],
	);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_faq_audience_stats',
	}, { manual: true });

	const fetchFaqAudiencesStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					start_date : formatStartDate || undefined,
					end_date   : formatEndDate || undefined,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [formatEndDate, formatStartDate, trigger]);

	useEffect(() => {
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		fetchFaqAudiencesStats();
	}, [page, date, fetchFaqAudiencesStats, formatStartDate, formatEndDate, data]);

	const { page_limit = 0, total_count = 0 } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchAudiencesStats: fetchFaqAudiencesStats,
		page,
		setPage,
		paginationData,
		data,
		loading,
		activeTab,
		setActiveTab,
		date,
		setDate,
	};
}

export default useFaqAudiencesStats;
