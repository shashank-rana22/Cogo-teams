import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;
const ITEMS_TO_BE_FETCHED = 10;

const useListCogooneFlashRatesLogs = () => {
	const [pagination, setPagination] = useState(DEFAULT_PAGE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_flash_rates_logs',
		// url    : '/list_shipment_flash_booking_rates',
		method : 'get',
	}, { manual: true });

	const getFlashRateLogs = useCallback(async () => {
		try {
			await trigger({
				params: {
					is_indicative_price_required : true,
					page_limit                   : ITEMS_TO_BE_FETCHED,
					page                         : pagination,
					sort_type                    : 'desc',

				},
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger, pagination]);

	useEffect(() => {
		getFlashRateLogs();
	}, [getFlashRateLogs]);

	return {
		logsLoading : loading,
		getFlashRateLogs,
		logsData    : data,
		setPagination,
	};
};
export default useListCogooneFlashRatesLogs;
