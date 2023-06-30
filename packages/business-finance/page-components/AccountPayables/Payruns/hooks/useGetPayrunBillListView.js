import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPayrunBillListView = ({ activePayrunTab }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/bill-list-view',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_list_view',
		},
		{ manual: true, autoCancel: false },
	);

	const getPayrunListView = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex : 1,
						pageSize  : 10,
						state     : activePayrunTab,
					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		}

		)();
	}, [activePayrunTab, trigger]);

	return {
		getPayrunListView,
		billListViewData    : data,
		billListViewLoading : loading,
	};
};

export default useGetPayrunBillListView;
