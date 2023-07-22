import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;
const ITEMS_TO_BE_FETCHED = 10;

const getParams = ({ filters, query, page }) => ({
	is_indicative_price_required : true,
	page_limit                   : ITEMS_TO_BE_FETCHED,
	page,
	sort_type                    : 'desc',
	shipment_serial_id           : query || undefined,
	filters                      : {
		status                  : 'active',
		service_type            : filters?.service_type || undefined,
		created_at_greater_than : filters?.flashed_at || undefined,
	},

});

const useListCogooneFlashRatesLogs = ({ sidQuery, filtersParams }) => {
	const [pagination, setPagination] = useState(DEFAULT_PAGE);

	const { debounceQuery, query: sQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_flash_rates_logs',
		method : 'get',
	}, { manual: true });

	const getFlashRateLogs = useCallback(
		async ({ filters, query, page = 1 }) => {
			try {
				await trigger({
					params: getParams({ filters, query, page }),
				});
				setPagination(page);
			} catch (error) {
				console.log('error:', error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		debounceQuery(sidQuery?.trim());
	}, [debounceQuery, sidQuery]);

	useEffect(() => {
		console.log('filtersParams:', filtersParams);
		console.log('sQuery:', sQuery);
		getFlashRateLogs({
			filters : filtersParams,
			query   : sQuery,
			page    : 1,
		});
	}, [getFlashRateLogs, filtersParams, sQuery]);

	return {
		logsLoading : loading,
		logsData    : data,
		getFlashRateLogs,
		pagination,
		sQuery,
	};
};

export default useListCogooneFlashRatesLogs;
