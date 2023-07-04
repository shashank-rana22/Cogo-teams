import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPaidList = ({ activePayrunTab }) => {
	const [{ data:paidDataList, loading:paidDataLoading }, paidTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill',
	}, { manual: true, autoCancel: false });

	const getPaidList = useCallback(async () => {
		try {
			await paidTrigger({
				params: {
					pageIndex : 1,
					pageSize  : 10,
					state     : activePayrunTab,
				},
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [activePayrunTab, paidTrigger]);

	return {
		paidDataList,
		paidDataLoading,
		getPaidList,
	};
};

export default useGetPaidList;
