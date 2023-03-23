import { useRequest } from '@cogoport/request';
import { addMinutes, addHours } from '@cogoport/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';

function useListFaqSearchHistories() {
	const [dateRange, setDateRange] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_search_histories',
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
						created_at_greater_than : formatStartDate || undefined,
						created_at_less_than    : formatEndDate || undefined,

					},

					page_limit               : 100000000 || undefined,
					pie_chart_data_required  : true,
					pagination_data_required : false,
					graph_data_required      : true,
					data_required            : false,
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
