import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const getAdvancePaymentPayload = ({
	pageIndex,
	pageSize,
	activePayrunTab,
	query,
	cogoBankId,
	selectFromDate,
	selectToDate,
}) => ({
	pageIndex,
	pageSize,
	state      : activePayrunTab,
	q          : query !== '' ? query : undefined,
	startDate  : selectFromDate || undefined,
	endDate    : selectToDate || undefined,
	cogoBankId : cogoBankId || undefined,
});

const useGetPaidAdvanceList = ({ activePayrunTab, query, globalFilters }) => {
	const { pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};

	const [{ data, loading }, paidAdvanceListTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-advance-doc',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(selectDate);

	const getAdvancePaidData = useCallback(() => {
		const payload = getAdvancePaymentPayload({
			pageIndex,
			pageSize,
			activePayrunTab,
			query,
			cogoBankId,
			selectFromDate,
			selectToDate,
		});
		try {
			paidAdvanceListTrigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing Went wrong');
		}
	}, [activePayrunTab, cogoBankId, pageIndex, pageSize, paidAdvanceListTrigger, query, selectFromDate, selectToDate]);

	return {
		getAdvancePaidData,
		paidAdvanceListData    : data,
		paidAdvanceListLoading : loading,
	};
};

export default useGetPaidAdvanceList;
