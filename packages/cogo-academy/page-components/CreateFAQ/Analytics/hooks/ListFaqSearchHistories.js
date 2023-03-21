import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { addMinutes, addHours } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListFaqSearchHistories({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
}) {
	const [dateRange, setDateRange] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_search_histories',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const formatStartDate = dateRange?.startDate ? addMinutes(addHours(dateRange?.startDate, 5), 30) : undefined;
	const formatEndDate = dateRange?.endDate ? addMinutes(addHours(dateRange?.endDate, 5), 30) : undefined;

	const fetchFaqSearchHistories = async () => {
		try {
			await trigger({
				params: {
					filters: {

						q                       : query || undefined,
						faq_topic_id            : topicId || undefined,
						faq_tag_id              : tagId || undefined,
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
	};

	useEffect(() => {
		fetchFaqSearchHistories();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, topicId, JSON.stringify(tagId), dateRange]);

	return {
		refetchSearchHistories: fetchFaqSearchHistories,
		data,
		dateRange,
		setDateRange,
		loading,
	};
}

export default useListFaqSearchHistories;
