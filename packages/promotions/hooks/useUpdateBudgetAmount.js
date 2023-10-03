import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateBudgetAmount = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_budget_amount',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateBudgetAmount = async ({ data = {}, refetchDashboard = () => {} }) => {
		try {
			await trigger({
				data,
			});
			Toast.success('Budget Updated');
			refetchDashboard();
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		updateBudgetAmount,
		loading,
	};
};

export default useUpdateBudgetAmount;
