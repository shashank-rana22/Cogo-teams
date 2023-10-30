import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../../commons/toastApiError';

const useSendSyncOverHeadsVendorExpense = () => {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/sync-overhead-expense-to-open-search',
			method  : 'post',
			authKey : 'post_overhead_expense_to_open_search',
		},
		{ manual: true },
	);

	const sendSyncOverHeadsVendorExpense = async (val) => {
		try {
			await trigger({
				data:
				{
					billId: val,
				},
			});
			Toast.success('Succesfully updated');
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		loading,
		sendSyncOverHeadsVendorExpense,
	};
};

export default useSendSyncOverHeadsVendorExpense;
