import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const getPaidListPayload = ({
	pageIndex, pageSize, activePayrunTab, query, billStatus, paymentStatusList,
	selectFromDate, selectToDate, cogoBankId,
}) => ({
	pageIndex,
	pageSize,
	state             : activePayrunTab,
	q                 : query !== '' ? query : undefined,
	status            : billStatus || undefined,
	paymentStatusList : paymentStatusList || undefined,
	startDate         : selectFromDate || undefined,
	endDate           : selectToDate || undefined,
	cogoBankId        : cogoBankId || undefined,
});

const useGetPaidList = ({ activePayrunTab, query, globalFilters }) => {
	const { paymentStatusList, billStatus, pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};

	const [{ data, loading }, paidTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(selectDate);

	const getPaidList = useCallback(() => {
		const payload = getPaidListPayload({
			pageIndex,
			pageSize,
			activePayrunTab,
			query,
			billStatus,
			paymentStatusList,
			selectFromDate,
			selectToDate,
			cogoBankId,
		});

		try {
			paidTrigger({
				params: payload,
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [activePayrunTab, billStatus, cogoBankId, pageIndex, pageSize, paidTrigger,
		paymentStatusList, query, selectFromDate, selectToDate]);

	return {
		paidDataList    : data,
		paidDataLoading : loading,
		getPaidList,
	};
};

export default useGetPaidList;
