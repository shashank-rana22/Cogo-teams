/* eslint-disable no-mixed-spaces-and-tabs */
import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useListSailingSchedulePortPairs = ({ filters, currentPage }) => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'GET',
			url    : '/list_sailing_schedule_port_pairs',
			scope,
		},
		{ manual: true },
	);
	const getListSailingSchedulePortPairData = async () => {
		try {
			await trigger({
				params: {
					filters:
                        filters?.origin_port && filters?.destination_port
                        	? {
                        		origin_port_id      : filters.origin_port,
                        		destination_port_id : filters.destination_port,
                        	}
                        	: null,
					page       : currentPage,
					page_limit : 15,
				},
			});
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};

	useEffect(() => {
		getListSailingSchedulePortPairData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), currentPage]);

	return {
		data       : data?.list,
		getListSailingSchedulePortPairData,
		totalCount : data?.total_count,
		loading,
	};
};

export default useListSailingSchedulePortPairs;
