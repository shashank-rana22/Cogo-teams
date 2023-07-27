import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetPaidAdvanceList = ({ activePayrunTab, query, globalFilters }) => {
	const { pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};

	const [{ data: paidAdvanceListData, loading: paidAdvanceListLoading }, paidAdvanceListTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-advance-doc',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(selectDate);

	const getAdvancePaymentPayload = useCallback(() => ({
		pageIndex,
		pageSize,
		state      : activePayrunTab,
		q          : query !== '' ? query : undefined,
		startDate  : selectFromDate || undefined,
		endDate    : selectToDate || undefined,
		cogoBankId : cogoBankId || undefined,
	}), [activePayrunTab, cogoBankId, pageIndex, pageSize, query, selectFromDate, selectToDate]);

	const getAdvancePaidData = useCallback(() => {
		const getPayload = getAdvancePaymentPayload();
		try {
			paidAdvanceListTrigger({
				params: getPayload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing Went wrong');
		}
	}, [getAdvancePaymentPayload, paidAdvanceListTrigger]);

	return {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	};
};

export default useGetPaidAdvanceList;
