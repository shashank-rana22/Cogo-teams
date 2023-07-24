import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetPaidList = ({ activePayrunTab, query, globalFilters }) => {
	const { paymentStatusList, billStatus, pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};
	const [{ data: paidDataList, loading: paidDataLoading }, paidTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill',
	}, { manual: true, autoCancel: false });
	const { selectFromDate, selectToDate } = dateFormatter(selectDate);

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
					cogoBankId        : cogoBankId || undefined,
				},
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [activePayrunTab, billStatus, pageIndex, pageSize, paidTrigger,
		paymentStatusList, query, selectFromDate, selectToDate, cogoBankId]);

	return {
		paidDataList,
		paidDataLoading,
		getPaidList,
	};
};

export default useGetPaidList;
