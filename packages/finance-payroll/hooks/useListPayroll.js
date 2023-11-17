import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListPayroll = ({ selectedMonth = '' } = {}) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_payroll',
	}, { manual: true });

	const listPayroll = useCallback(
		async () => {
			try {
				const { page_limit, page, status, ...rest } = filters;
				// console.log(typeof new Date(date[GLOBAL_CONSTANTS.zeroeth_index]), 'hi');
				await trigger({
					params: {
						filters: {
							...rest,
							status,
						},
						payroll_month   : String(selectedMonth),
						is_finance_view : true,
						page_limit,
						page,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[filters, trigger, selectedMonth],
	);

	useEffect(() => {
		listPayroll();
	}, [listPayroll]);

	return { loading, data, filters, setFilters, refetch: listPayroll };
};

export default useListPayroll;
