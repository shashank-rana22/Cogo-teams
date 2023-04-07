import { useRequest } from '@cogoport/request';
import { addMinutes, addHours } from '@cogoport/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';

function useListFaqSearchHistories() {
	const [dateRange, setDateRange] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_search_history_stats',
	}, { manual: true });

	const formatStartDate = useMemo(
		() => (dateRange?.startDate ? addMinutes(addHours(dateRange?.startDate, 5), 30) : undefined),
		[dateRange?.startDate],
	);

	const formatEndDate = useMemo(
		() => (dateRange?.endDate ? addMinutes(addHours(dateRange?.endDate, 5), 30) : undefined),
		[dateRange?.endDate],
	);

	const fetchFaqSearchHistories = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						start_date : formatStartDate || undefined,
						end_date   : formatEndDate || undefined,

					},

				},
			});
		} catch (error) {
			console.log('error ::: ', error);
		}
	}, [formatEndDate, formatStartDate, trigger]);

	useEffect(() => {
		fetchFaqSearchHistories();
	}, [dateRange, fetchFaqSearchHistories]);

	return {
		refetchSearchHistories: fetchFaqSearchHistories,
		data,
		dateRange,
		setDateRange,
		loading,
	};
}

export default useListFaqSearchHistories;
