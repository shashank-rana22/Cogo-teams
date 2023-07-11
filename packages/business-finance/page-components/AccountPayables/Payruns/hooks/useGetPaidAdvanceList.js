import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPaidAdvanceList = ({ activePayrunTab, query }) => {
	const [{ data:paidAdvanceListData, loading:paidAdvanceListLoading }, paidAdvanceListTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-advance-doc',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc',
	}, { manual: true, autoCancel: false });

	const getAdvancePaidData = useCallback(() => {
		try {
			paidAdvanceListTrigger({
				params: {
					pageIndex : 1,
					pageSize  : 10,
					state     : activePayrunTab,
					q         : query !== '' ? query : undefined,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing Went wrong');
		}
	}, [activePayrunTab, paidAdvanceListTrigger, query]);

	return {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	};
};

export default useGetPaidAdvanceList;
