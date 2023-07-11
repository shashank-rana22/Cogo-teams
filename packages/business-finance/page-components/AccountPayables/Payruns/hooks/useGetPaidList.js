import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPaidList = ({ activePayrunTab, query, globalFilters }) => {
	const { paymentStatusList, billStatus, pageIndex, pageSize, selectDate } = globalFilters || {};
	const [{ data:paidDataList, loading:paidDataLoading }, paidTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill',
	}, { manual: true, autoCancel: false });
	const selectFromDate =		selectDate
	&& formatDate({
		date       : selectDate.startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const selectToDate =		selectDate
	&& formatDate({
		date       : selectDate.endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const getPaidList = useCallback(async () => {
		try {
			await paidTrigger({
				params: {
					pageIndex,
					pageSize,
					state             : activePayrunTab,
					q                 : query !== '' ? query : undefined,
					status            : billStatus || undefined,
					paymentStatusList : paymentStatusList || undefined,
					startDate         : selectFromDate || undefined,
					endDate           : selectToDate || undefined,
				},
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [activePayrunTab, billStatus, pageIndex, pageSize, paidTrigger,
		paymentStatusList, query, selectFromDate, selectToDate]);

	return {
		paidDataList,
		paidDataLoading,
		getPaidList,
	};
};

export default useGetPaidList;
