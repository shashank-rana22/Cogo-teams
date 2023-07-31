import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetPaidList = ({ activePayrunTab, query, globalFilters }) => {
	const { paymentStatusList, billStatus, pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};

	const [{ data, loading }, paidTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(selectDate);

	const getPaidListPayload = useCallback(() => ({
		pageIndex,
		pageSize,
		state             : activePayrunTab,
		q                 : query !== '' ? query : undefined,
		status            : billStatus || undefined,
		paymentStatusList : paymentStatusList || undefined,
		startDate         : selectFromDate || undefined,
		endDate           : selectToDate || undefined,
		cogoBankId        : cogoBankId || undefined,
	}), [activePayrunTab, billStatus, cogoBankId, pageIndex,
		pageSize, paymentStatusList, query, selectFromDate, selectToDate]);

	const getPaidList = useCallback(() => {
		const getPayload = getPaidListPayload();

		try {
			paidTrigger({
				params: getPayload,
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [getPaidListPayload, paidTrigger]);

	return {
		paidDataList    : data,
		paidDataLoading : loading,
		getPaidList,
	};
};

export default useGetPaidList;
