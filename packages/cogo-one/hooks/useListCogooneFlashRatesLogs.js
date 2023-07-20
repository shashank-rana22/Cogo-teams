import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;
const ITEMS_TO_BE_FETCHED = 10;

const useListCogooneFlashRatesLogs = ({ sidQuery, filtersParams }) => {
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
					shipment_serial_id           : sidQuery || undefined,
					filters                      : {
						shipment_state          : ['confirmed_by_importer_exporter', 'in_progress'],
						service_type            : filtersParams?.service_type || undefined,
						created_at_greater_than : filtersParams?.flashed_at || undefined,
					},

				},
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger, pagination, filtersParams, sidQuery]);

	useEffect(() => {
		getFlashRateLogs();
	}, [getFlashRateLogs]);

	return {
		logsLoading : loading,
		logsData    : data,
		getFlashRateLogs,
		setPagination,
	};
};
export default useListCogooneFlashRatesLogs;
